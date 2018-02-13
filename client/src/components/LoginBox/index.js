import React from "react";

import { getProfile, isLoggedIn } from "qoc/authHelper";
import webAuth from "qoc/webAuth";

import "./LoginBox.styl";

export default class LoginBox extends React.Component {
    login() {
        webAuth.authorize();
    }

    render() {
        const profile = getProfile();
        if (isLoggedIn()) {
            return <footer>
                Hello, {profile.given_name}.&nbsp;
                <a href="#" onClick={this.login}>Not you?</a>
            </footer>
        }
        else {
            return <footer>
                <a href="#" onClick={this.login}>Log in to save your projects</a>
            </footer>
        }
    }
}