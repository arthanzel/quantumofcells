import cuid from "cuid";
import PropTypes from "prop-types";
import React from "react";

import channel from "qoc/channel";

import "./ToastBar.styl";

const MESSAGE_DURATION = 10000; // Milliseconds

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
        this.toastSub = channel.subscribe(channel.TOAST, (message) => {
            const messages = this.state.messages.slice();
            messages.push(this.createMessage(message));
            this.setState({ messages: messages });
        });
        this.clearSub = channel.subscribe(channel.CLEAR_TOASTS, () => {
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

    render() {
        return <div className="toastContainer">
            {this.state.messages.map((msg) => {
                return <Toast key={msg.key}>{msg.text}</Toast>;
            })}
        </div>
    }
}

class Toast extends React.Component {
    static defaultProps = {
        message: ""
    };

    static propTypes = {
        message: PropTypes.string
    };

    render() {
        return <div className="toast">
            <div className="toast-message"
                 dangerouslySetInnerHTML={{ __html: this.props.message || this.props.children }} />
            <a href="#" className="toast-close">Close</a>
        </div>
    }
}