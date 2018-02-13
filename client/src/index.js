import React from "react";
import ReactDOM from "react-dom";

import QOCApplication from "components/QOCApplication";

import "index.styl"

// Create the Redux store
import "qoc/store";

import { WebAuth } from "auth0-js";

ReactDOM.render(<QOCApplication />, document.getElementById("qoc-app-container"));

let webAuth = new WebAuth({
    domain: "qoc.auth0.com",
    clientID: "IIlRrl3lLjVaHqJezrqVN3C3YoM1x5Fw",
    redirectUri: window.location.href
});
webAuth.parseHash((err, result) => {
    console.log("error", err);
    console.log(result);
});
