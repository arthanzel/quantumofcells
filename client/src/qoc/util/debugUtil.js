/*
This file contains functions to help debug the client.
You can call these functions in development in the browser's developer console.
 */

import { checkSession } from "./authUtils";
import { messageChannel as channel } from "qoc/util/notifyUtils";
import store from "../store";

window.checkSession = checkSession;

/**
 * Prints session information from localStorage and from the app state.
 */
window.printAuth = function printAuth() {
    console.log("From localStorage:", JSON.parse(localStorage.getItem("auth0")));

    const user = store.getState().user;
    if (user) {
        console.log("From store: ", user);
    }
    else {
        console.log("No user logged in");
    }
};

/**
 * Makes a toast notification.
 */
window.makeToast = function toast(msg) {
    channel.publish(channel.TOAST, msg);
};

/**
 * Sets the current user session to expire soon, so an automatic re-authentication will be triggered.
 */
window.setReauth = function setReauth() {
    let soon = new Date();
    soon.setSeconds(soon.getSeconds() + 60);
    store.getState().user.expireDate = soon;
};
