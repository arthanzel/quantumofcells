import React from "react";
import ReactDOM from "react-dom";

import "qoc/icons";
import QOCApplication from "components/QOCApplication";
import { checkSession, login, logout } from "qoc/authHelper";

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