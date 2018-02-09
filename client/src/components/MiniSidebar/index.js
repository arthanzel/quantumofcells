import React from "react";
import postal from "postal";

import actions from "reducers/actions";

import "./MiniSidebar.styl";

const qocChannel = postal.channel("qoc");

// TODO: Move this to the real Sidebar and get rid of the pubsub coupling
export default class QOCApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hidden: props.hidden };
    }

    componentDidMount() {
        this.subscription = qocChannel.subscribe("sidebar", (data) => {
            switch (data.type) {
                case actions.MINIMIZE_SIDEBAR:
                    this.setState({ hidden: false });
                    break;
            }
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        const cls = this.state.hidden ? "hidden" : "";
        return <div className={`qoc-mini-sidebar ${cls}`}>
            <p>Q</p>
            <a href="#"><i className="fa fa-folder-open" /></a>
            <a href="#"><i className="fa fa-tasks" /></a>
            <a href="#"><i className="fa fa-gears" /></a>
        </div>
    }
}