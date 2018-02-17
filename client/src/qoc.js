import React from "react";
import ReactDOM from "react-dom";

import QOCApplication from "components/QOCApplication";
import { checkSession, login } from "qoc/authHelper";
import webAuth from "qoc/webAuth";

// TODO: If debug
import "qoc/debugActions";

import "qoc.styl"

// Create the Redux store
import store from "qoc/store";

const ls = window.localStorage;

ReactDOM.render(<QOCApplication />, document.getElementById("qoc-app-container"));

// Login if auth was passed through localStorage
if (ls.getItem("auth0")) {
    const json = JSON.parse(ls.getItem("auth0"));
    login(json.accessToken, json.expireDate, json.idTokenPayload.given_name);
}

setInterval(checkSession, 10000);
checkSession();