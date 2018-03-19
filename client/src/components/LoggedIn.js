import React from "react";

import { isLoginValid } from "../qoc/authHelper";

export default class LoggedIn extends React.Component {
    render() {
        if (isLoginValid()) {
            return this.props.children;
        }
        return null;
    }
};

LoggedIn.LoggedOut = class LoggedOut extends React.Component {
    render() {
        if (!isLoginValid()) {
            return this.props.children;
        }
        return null;
    }
};
