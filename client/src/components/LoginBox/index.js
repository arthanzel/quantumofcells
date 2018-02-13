import React from "react";
import { WebAuth } from "auth0-js";

import "./LoginBox.styl";

export default class LoginBox extends React.Component {
    login() {
        let webAuth = new WebAuth({
            domain: "qoc.auth0.com",
            clientID: "IIlRrl3lLjVaHqJezrqVN3C3YoM1x5Fw",
            redirectUri: window.location.href
        });
        console.log("webauth", webAuth);
        webAuth.authorize({
            responseType: "token id_token"
        });
    }

    render() {
        return <footer>
            Hello, Martin.&nbsp;
            <a href="#" onClick={this.login}>Not you?</a>
        </footer>
    }
}