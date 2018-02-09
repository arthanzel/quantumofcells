import React from "react";
import postal from "postal"

import "./QChart.styl";

const qocChannel = postal.channel("qoc");

export default class QChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        this.subscription = qocChannel.subscribe("simulate", (data, envelope) => {
            this.setState({ data: data });
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return <div className="qChart">
            {this.state.data.toString()}
        </div>
    }
}