export function getExpiration() {
    if (window.localStorage.getItem("expires") !== undefined) {
        return new Date(window.localStorage.getItem("expires"));
    }
    return null;
}

export function getProfile() {
    if (window.localStorage.getItem("idPayload") !== undefined) {
        return JSON.parse(window.localStorage.getItem("idPayload"));
    }
    return null;
}

export function isLoggedIn() {
    return new getExpiration() - new Date() > 0;
}