import actions from "reducers/actions";
import store from "./store";
import webAuth from "./webAuth";

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
        // TODO: expireDate is a String. Debug auto-logout.
        const expiresIn = store.getState().user.expireDate - new Date(); // Milliseconds
        if (expiresIn < leeway || force === true) {
            console.log("Refreshing session");
            webAuth.checkSession({}, (err, result) => {
                if (!err && result) {
                    // Refresh successful
                    const userToken = parseAuth0Result(result);
                    window.localStorage.setItem("auth0", JSON.stringify(userToken));
                    login(userToken.accessToken, userToken.expireDate, userToken.name);
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
export function login(accessToken, expireDate, name) {
    if (expireDate < new Date()) {
        return false;
    }

    const user = {
        accessToken: accessToken,
        expireDate: expireDate,
        name: name
    };

    store.dispatch({ type: actions.LOGIN, user: user });
    return true;
}

/**
 * Removes login information from the global state.
 */
export function logout() {
    if (store.getState().user.accessToken) {
        // Avoid polluting the Redux history if the user is logged out
        store.dispatch({ type: actions.LOGOUT });
    }
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
        user.name &&
        user.expireDate > new Date());
}

export function parseAuth0Result(result) {
    const expireDate = new Date();
    expireDate.setSeconds(result.expireDate.getSeconds() + result.expiresIn);
    return {
        accessToken: result.accessToken,
        expireDate: expireDate,
        name: result.idTokenPayload.given_name
    };
}