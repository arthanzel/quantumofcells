import React from "react";
import ReactDOM from "react-dom";

import QOCApplication from "components/QOCApplication";
import { getProfile, isLoggedIn } from "qoc/authHelper";

import "index.styl"

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

// TODO: Check the token expiry every 60 seconds and do silent auths via checkSession()