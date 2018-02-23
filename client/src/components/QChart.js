import React from "react";
import Icon from "@fortawesome/react-fontawesome";
import HighCharts from "highcharts";
import cuid from "cuid";

import channel from "qoc/channel";
import simulate from "qoc/simulator";

import "./QChart.styl";

export default class QChart extends React.Component {
    constructor(props) {
        super(props);
        this.elementId = "chart-" + cuid();
        this.state = {
            solution: {}
        }
    }

    componentDidMount() {
        this.subscription = channel.subscribe(channel.SIMULATE, (data) => {
            this.setState({ solution: data }, this.drawChart);
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    drawChart = () => {
        // TODO: Make this format the default for the solver
        const series = [];
        for (let symbol in this.state.solution.series) {
            series.push({ name: symbol, data: this.state.solution.series[symbol] });
        }

        HighCharts.chart(this.elementId, {
            series: series
        });
    };

    simulate() {
        simulate();
    }

    render() {
        let inner;
        if (this.state.solution.data === undefined) {
            return <div className="qChart" id={this.elementId}>
                <div className="empty">
                    <h1>Run a simulation to see results</h1>
                    <p>Punch in some equations in the <strong>Equations</strong> panel on the left and click <button
                        className="btn btn-primary" onClick={this.simulate}>Simulate</button></p>
                    <p>Need help? Look at the <a href="#">sample projects</a> or <a href="#">read the docs</a>.</p>
                </div>
            </div>
        }
        else {
            return <div className="qChart" id={this.elementId}>
                {/*<div className="empty">*/}
                    {/*<h1><Icon icon="cog" pulse /></h1>*/}
                    {/*<p>Crunching the numbers...</p>*/}
                {/*</div>*/}
            </div>
        }
    }
}