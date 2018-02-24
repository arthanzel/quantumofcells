import React from "react";
import ReactDOM from "react-dom";

import "qoc/icons";
import QOCApplication from "components/QOCApplication";
import { checkSession, login } from "qoc/authHelper";

if (process.env.DEBUG) {
    console.log("Debug mode! Importing debug methods.")
    require("./qoc/debugActions");
}

import "qoc.styl"

// Ensure environment is good
if (process.env.EDITOR_URL === undefined ||
    process.env.REDIRECT_URI === undefined) {
    console.error("Missing environment variables! Did you forget to copy .env.defaults to .env ?")
}

// Create the Redux store
import store from "qoc/store";

const ls = window.localStorage;

ReactDOM.render(<QOCApplication />, document.getElementById("qoc-app-container"));

// Login if auth was passed through localStorage
if (ls.getItem("auth0")) {
    const json = JSON.parse(ls.getItem("auth0"));
    login(json.accessToken, json.expireDate, json.idTokenPayload.given_name);
}

setInterval(checkSession, 60 * 1000); // 60 seconds
checkSession();