import React from "react";

import { isLoginValid } from "qoc/util/authUtils";

/**
 * Component that renders its children only if a user is logged in.
 */
export default class LoggedIn extends React.Component {
    render() {
        if (isLoginValid()) {
            return this.props.children;
        }
        return null;
    }
};

/**
 * component that renders its children only if no user is logged in.
 */
LoggedIn.LoggedOut = class LoggedOut extends React.Component {
    render() {
        if (!isLoginValid()) {
            return this.props.children;
        }
        return null;
    }
};
