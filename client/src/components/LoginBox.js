import React from "react";

import actions from "reducers/actions";
import { getProfile, isLoggedIn } from "qoc/authHelper";
import store from "qoc/store";
import webAuth from "qoc/webAuth";

import "./LoginBox.styl";

export default class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: store.getState().user.name };
    }

    componentDidMount() {
        this.sub = store.subscribe(() => {
            if (this.state.name !== store.getState().user.name) {
                this.setState({ name: store.getState().user.name });
            }
        });
    }

    login() {
        webAuth.authorize();
    }

    render() {
        if (this.state.name) {
            return <footer>
                Hello, {this.state.name}.&nbsp;
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