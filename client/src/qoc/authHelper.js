import actions from "reducers/actions";
import store from "./store";
import webAuth from "./webAuth";

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
    if (isLoggedIn()) {
        const expiresIn = store.getState().user.expireDate - new Date(); // Milliseconds
        if (expiresIn < leeway || force === true) {
            console.log("Re-authenticate!");
            webAuth.checkSession({}, (err, result) => {
                if (!err) {
                    result.expireDate = new Date();
                    result.expireDate.setSeconds(result.expireDate.getSeconds() + result.expiresIn);
                    window.localStorage.setItem("auth0", JSON.stringify(result));
                    login(result.accessToken, result.expireDate, result.idTokenPayload.given_name);
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
    store.dispatch({ type: actions.LOGOUT });
    window.localStorage.removeItem("auth0");
}

/**
 * Returns true if a user is logged in, false otherwise.
 */
export function isLoggedIn() {
    const user = store.getState().user;
    return user.expireDate && user.expireDate > new Date();
}