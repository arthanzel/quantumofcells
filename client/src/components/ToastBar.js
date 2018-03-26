import cuid from "cuid";
import PropTypes from "prop-types";
import React from "react";

import { messageChannel as channel, MESSAGE_CLEAR_TOASTS, MESSAGE_MAKE_TOAST } from "qoc/util/notifyUtils";

import "./ToastBar.styl";

const MESSAGE_DURATION = 6000; // Milliseconds

export default class ToastBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }
    }

    createMessage(text) {
        const key = cuid();
        setTimeout(() => {
            this.setState({ messages: this.state.messages.filter((msg) => msg.key !== key) });
        }, MESSAGE_DURATION);

        return {
            text: text,
            key: key,
            expires: MESSAGE_DURATION,
            created: new Date()
        };
    }

    componentDidMount() {
        this.toastSub = channel.subscribe(MESSAGE_MAKE_TOAST, (message) => {
            this.setState((prevState) => {
                const messages = prevState.messages.slice();
                messages.push(this.createMessage(message));
                return { messages: messages };
            });
        });
        this.clearSub = channel.subscribe(MESSAGE_CLEAR_TOASTS, () => {
            this.setState({ messages: [] });
        })
    }

    componentWillUnmount() {
        if (this.toastSub) {
            this.toastSub.unsubscribe();
        }
        if (this.clearSub) {
            this.clearSub.unsubscribe();
        }
    }

    closeMessage = (messageToRemove) => {
        this.setState({ messages: this.state.messages.filter((msg) => msg !== messageToRemove) });
    };

    render() {
        return <div className="toastContainer">
            {this.state.messages.map((msg) => {
                return <Toast key={msg.key} onClose={() => this.closeMessage(msg)}>{msg.text}</Toast>;
            })}
        </div>
    }
}

class Toast extends React.Component {
    static defaultProps = {
        message: "",
        onClose: () => {}
    };

    static propTypes = {
        message: PropTypes.string,
        onClose: PropTypes.func
    };

    render() {
        return <div className="toast">
            <div className="toast-message"
                 dangerouslySetInnerHTML={{ __html: this.props.message || this.props.children }} />
            <div className="toast-close">
                <a href="#" className="btn btn-outline-danger" onClick={this.props.onClose}>Close</a>
            </div>
        </div>
    }
}