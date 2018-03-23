import React from "react";
import ReactDOM from "react-dom";

import "qoc/icons";
import QOCApplication from "components/QOCApplication";
import { login, getSavedLogin, logout } from "qoc/util/authUtils";

if (CONFIG.debug) {
    // TODO: Find a way not to require this file at compile-time in production
    console.log("Debug mode! Importing debug methods.");
    require("./qoc/util/debugUtil");
    document.title = "DEV " + document.title;
}

import "qoc.styl"

// Ensure environment is good
if (CONFIG.editorUrl === undefined ||
    CONFIG.callbackUrl === undefined ||
    CONFIG.serverUrl === undefined) {
    console.error("Missing environment variables! Maybe the config is broken?")
}

// Create the Redux store
import "qoc/store";

const ls = window.localStorage;

ReactDOM.render(<QOCApplication />, document.getElementById("qoc-app-container"));

// Login if auth was passed through localStorage
if (ls.getItem("auth0")) {
    /*
    Try logging in from the token in localStorage.
    This is the only place that the user object in localStorage should be read.
    The user object should be fetched from store.getState().user.
     */
    try {
        if (!login(getSavedLogin())) {
            // Login has expired or is invalid
            logout();
        }
    }
    catch (e) {
        // Invalid user object token
        console.error(e);
        ls.removeItem("auth0");
    }
}
