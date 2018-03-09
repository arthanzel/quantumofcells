import React from "react";
import ReactDOM from "react-dom";

import "qoc/icons";
import QOCApplication from "components/QOCApplication";
import { checkSession, login, logout, isLoginValid } from "qoc/authHelper";

if (process.env.DEBUG) {
    console.log("Debug mode! Importing debug methods.")
    require("./qoc/debugActions");
    document.title = "DEV " + document.title;
}

import "qoc.styl"

// Ensure environment is good
if (process.env.EDITOR_URL === undefined ||
    process.env.CALLBACK_URL === undefined ||
    process.env.SERVER_URL === undefined) {
    console.error("Missing environment variables! Did you forget to copy .env.defaults to .env ?")
}

// Create the Redux store
import "qoc/store";

const ls = window.localStorage;

ReactDOM.render(<QOCApplication />, document.getElementById("qoc-app-container"));

// Login if auth was passed through localStorage
if (ls.getItem("auth0")) {
    /*
    The information in localStorage should only be accessed once the app starts.
    It is *only* set on a login by the Auth0 callback handler, and *only* deleted in authHelper.js.
    Use the `user` object in the global state to access the session.
     */
    try {
        const userObject = JSON.parse(ls.getItem("auth0"));
        if (isLoginValid(userObject)) {
            login(userObject.accessToken, userObject.expireDate, userObject.name);
        }
        else {
            // Login has expired or is invalid
            ls.removeItem("auth0");
        }
    }
    catch (e) {
        // Invalid user object token
        ls.removeItem("auth0");
    }
}

setInterval(checkSession, 10 * 1000); // 60 seconds
checkSession();