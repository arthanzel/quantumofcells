import React from "react";

import channel from "qoc/channel";
import simulate from "qoc/simulator";

import "./QChart.styl";

export default class QChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solution: {}
        }
    }

    componentDidMount() {
        this.subscription = channel.subscribe(channel.SIMULATE, (data) => {
            this.setState({ solution: data });
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    simulate() {
        simulate();
    }

    render() {
        let inner;
        if (this.state.solution.data === undefined) {
            inner = <div className="empty">
                <h1>Run a simulation to see results</h1>
                <p>Punch in some equations in the <strong>Equations</strong> panel on the left and click <button className="btn btn-primary" onClick={this.simulate}>Simulate</button></p>
                <p>Need help? Look at the <a href="#">sample projects</a> or <a href="#">read the docs</a>.</p>
            </div>
        }
        else {
            inner = <textarea style={{width: "100%", height: "100%"}} value={JSON.stringify(this.state.solution, null, 4)}>

            </textarea>
        }

        return <div className="qChart">
            {inner}
        </div>
    }
}