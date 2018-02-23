import React from "react";
import ReactDOM from "react-dom";

import "qoc/icons";
import QOCApplication from "components/QOCApplication";
import { checkSession, login } from "qoc/authHelper";

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

setInterval(checkSession, 60 * 1000); // 60 seconds
checkSession();