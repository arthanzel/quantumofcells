import React from "react";

import actions from "reducers/actions";
import { getProfile, isLoggedIn } from "qoc/authHelper";
import store from "qoc/store";
import webAuth from "qoc/webAuth";

import "./LoginBox.styl";
import LoggedIn from "./LoggedIn";

export default class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: store.getState().user.name };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            if (this.state.name !== store.getState().user.name) {
                this.setState({ name: store.getState().user.name });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    login() {
        webAuth.authorize();
    }

    render() {
        return <footer>
            <LoggedIn>
                Hello, {this.state.name}.&nbsp;
                <a href="#" onClick={this.login}>Not you?</a>
            </LoggedIn>
            <LoggedIn.LoggedOut>
                <a href="#" onClick={this.login}>Log in to save your projects</a>
            </LoggedIn.LoggedOut>
        </footer>
        // if (this.state.name) {
        //     return <footer>
        //         Hello, {this.state.name}.&nbsp;
        //         <a href="#" onClick={this.login}>Not you?</a>
        //     </footer>
        // }
        // else {
        //     return <footer>
        //         <a href="#" onClick={this.login}>Log in to save your projects</a>
        //     </footer>
        // }
    }
}