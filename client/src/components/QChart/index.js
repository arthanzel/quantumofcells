import React from "react";

import channel from "qoc/channel";

import "./QChart.styl";

export default class QChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solution: {}
        }
    }

    componentDidMount() {
        this.subscription = channel.subscribe(channel.SIMULATE, (data, envelope) => {
            this.setState({ solution: data });
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return <div className="qChart">
            <textarea style={{width: "100%", height: "100%"}} value={JSON.stringify(this.state.solution, null, 4)}>

            </textarea>
        </div>
    }
}