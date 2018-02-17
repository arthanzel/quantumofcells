import React from "react";
import ReactDOM from "react-dom";

import QOCApplication from "components/QOCApplication";
import { getExpiration, getProfile, isLoggedIn } from "qoc/authHelper";
import webAuth from "qoc/webAuth";

import "qoc.styl"

// Create the Redux store
import "qoc/store";

ReactDOM.render(<QOCApplication />, document.getElementById("qoc-app-container"));

// Notify if not logged in
if (isLoggedIn()) {
    console.log("Logged in: ", getProfile());
}
else {
    console.log("Not logged in.");
}


function checkLogin(force) {
    const leeway = 5 * 60 * 1000; // 5 minutes
    if (isLoggedIn()) {
        const expiresIn = getExpiration() - new Date(); // Milliseconds
        console.log("Expires in ", expiresIn);
        if (expiresIn < leeway || force === true) {
            console.log("Re-authenticate!");
            webAuth.checkSession({}, (err, result) => {
                console.log("reauth error", err);
                console.log("reauth result", result);
                // TODO: Persist login
                // TODO: Logout on error
            });
        }
    }
}
setInterval(checkLogin, 10000);
window.checkLogin = checkLogin;
checkLogin();

import channel from "qoc/channel";
console.log(channel);