import React from "react";
import Icon from "@fortawesome/react-fontawesome";
import HighCharts from "highcharts";
import cuid from "cuid";

import { messageChannel as channel, MESSAGE_SIMULATE, MESSAGE_CHANGE_SIDEBAR_TAB } from "qoc/util/notifyUtils";

import "./QChart.styl";
import SimulateButton from "./SimulateButton";

export default class QChart extends React.Component {
    constructor(props) {
        super(props);
        this.elementId = "chart-" + cuid();
        this.state = {
            title: "",
            solution: {}
        }
    }

    componentDidMount() {
        this.subscription = channel.subscribe(MESSAGE_SIMULATE, (data) => {
            this.setState({ title: data.title, solution: data.solution }, this.drawChart);
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
            title: { text: this.state.title },
            series: series,
            xAxis: { title: { text: "Time <i>t</i>" } },
            yAxis: { title: null }
        });
    };

    openSamples() {
        channel.publish(MESSAGE_CHANGE_SIDEBAR_TAB, 0);
    }

    render() {
        if (this.state.solution.data === undefined) {
            return <div className="qChart" id={this.elementId}>
                <div className="empty">
                    <h1>Run a simulation to see results</h1>
                    <p>Punch in some equations in the <strong>Equations</strong> panel on the left and
                        click <SimulateButton /></p>
                    <p>Need help? Look at the <a href="#" onClick={this.openSamples}>sample projects</a>.
                        {/*or <a href="#">read the docs</a>.*/}
                    </p>
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