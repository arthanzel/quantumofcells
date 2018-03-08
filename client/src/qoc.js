import React from "react";
import ReactDOM from "react-dom";

import "qoc/icons";
import QOCApplication from "components/QOCApplication";
import { checkSession, login, logout } from "qoc/authHelper";

if (CONFIG.debug) {
    console.log("Debug mode! Importing debug methods.")
    require("./qoc/debugActions");
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
    The information in localStorage should only be accessed once the app starts.
    Use the `user` object in the global state to access the session.
     */
    try {
        const json = JSON.parse(ls.getItem("auth0"));
        login(json.accessToken, json.expireDate, json.idTokenPayload.given_name);
    }
    catch (e) {
        logout();
    }
}

setInterval(checkSession, 10 * 1000); // 60 seconds
checkSession();