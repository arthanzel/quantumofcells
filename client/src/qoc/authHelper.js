import actions from "reducers/actions";
import store from "./store";
import webAuth from "./webAuth";

/*
Login flow
==========
1. Page load
2. Does localStorage have login info?
    - No: Do nothing; stay logged out
3. Is the stored login info valid and current?
    - No: Remove the stored login info
4. Copy login to application state
5. Do checkSession every minute

Check session flow
==================
1. Is the user's login valid?
    - No: logout()
2. Is the user's login less than 5 minutes from expiring?
    - No: Do nothing
3. Try to refresh the session.
    - Error: Notify, logout and remove stored login
4. Update the stored login and the application state; reset interval
 */

let checkSessionInterval = 0;
const CHECK_SESSION_INTERVAL_MS = 60 * 1000;

/**
 * Returns the current access token.
 */
export function accessToken() {
    return store.getState().user.accessToken;
}

/**
 * Checks whether the user's current session is still valid.
 * If it is, this function returns true.
 * If the user's session is valid but about to expire within the next 5 minutes, a reauthentication is triggered.
 * If the user's session is not valid, this function returns false.
 * @param force If true, reauthentication proceeds regardless of whether the session is about to expire.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
export function checkSession(force) {
    const leeway = 5 * 60 * 1000; // 5 minutes
    if (isLoginValid()) {
        const expiresIn = store.getState().user.expireDate - new Date(); // Milliseconds
        if (expiresIn < leeway || force === true) {
            console.log("Refreshing session");
            webAuth.checkSession({}, (err, result) => {
                if (!err && result) {
                    // Refresh successful
                    const userObject = parseAuth0Result(result);
                    window.localStorage.setItem("auth0", JSON.stringify(userObject));
                    login(userObject);
                    console.log("Session refreshed");
                }
                else {
                    logout();
                    console.error("Reauthentication error");
                    console.error(err);
                }
            });
        }
        return true;
    }
    clearInterval(checkSessionInterval);
    logout();
    return false;
}

/**
 * Persists login information to the global state.
 * @param accessToken Auth0 JWT access token.
 * @param expireDate Date on which the token expires.
 * @param name Given name of the user.
 * @returns {boolean} True if the information was set, false otherwise (e.g. if the information is expired).
 */
export function login(userObject) {
    if (!isLoginValid(userObject)) {
        return false;
    }

    clearInterval(checkSessionInterval);
    checkSessionInterval = setInterval(checkSession, CHECK_SESSION_INTERVAL_MS);
    store.dispatch({ type: actions.LOGIN, user: userObject });
    checkSession();
    return true;
}

/**
 * Removes login information from the global state.
 */
export function logout() {
    if (store.getState().user.accessToken) {
        // Avoid polluting the Redux history if the user is already logged out
        store.dispatch({ type: actions.LOGOUT });
    }
    clearInterval(checkSessionInterval);
    window.localStorage.removeItem("auth0");
}

/**
 * Checks if the given user object represents a valid login.
 * If a user object is not provided, the one from the Redux state is used.
 * @param user User objects, containing expireDate, accessToken, and name fields.
 * @returns {boolean} True
 */
export function isLoginValid(user = store.getState().user) {
    return Boolean(user.expireDate &&
        user.accessToken &&
        user.name !== undefined &&
        user.expireDate > new Date());
}

export function parseAuth0Result(result) {
    const expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + result.expiresIn);
    return {
        accessToken: result.accessToken,
        expireDate: expireDate,
        name: result.idTokenPayload.given_name
    };
}

/**
 * Retrieves and parses the stored user object from localStorage.
 */
export function getSavedLogin() {
    const userObject = JSON.parse(window.localStorage.getItem("auth0"));
    userObject.expireDate = new Date(userObject.expireDate);
    return userObject;
}
