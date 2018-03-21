import React from "react";

import actions from "reducers/actions";
import LabeledNumberInput from "./LabeledNumberInput";
import SimulateButton from "./SimulateButton";
import store from "qoc/store";

/**
 * If the simulation reaches this number of samples (time * resolution), a warning is shown about degrading performance.
 * @type {number}
 */
const PERFORMANCE_LIMIT = 25000;

export default class SettingsPanel extends React.Component {
    constructor(props) {
        super(props);
        const state = store.getState();
        this.state = {
            time: state.time,
            resolution: state.resolution
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            const s = store.getState();
            if (this.state.time !== s.time) {
                this.setState({ time: s.time });
            }
            if (this.state.resolution !== s.resolution) {
                this.setState({ resolution: s.resolution });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    onChange = (e) => {
        const value = parseFloat(e.target.value);
        if (e.target.name === "time") {
            store.dispatch({ type: actions.SET_TIME, value: value })
        }
        else if (e.target.name === "resolution") {
            store.dispatch({ type: actions.SET_RESOLUTION, value: value })
        }
    };

    render() {
        return <div className="equationContainer">
            <header>
                <h3>Settings</h3>
            </header>
            <LabeledNumberInput
                label="Time"
                value={this.state.time}
                name="time"
                min={0}
                onChange={this.onChange} />
            <LabeledNumberInput
                label="Resolution"
                value={this.state.resolution}
                unit="samples/time"
                name="resolution"
                min={1}
                onChange={this.onChange} />

            <div className="controls">
                <SimulateButton />
            </div>

            {this.state.time * this.state.resolution > PERFORMANCE_LIMIT ?
                <div className="alert alert-warning">
                    Running a simulation for too long or at a very high resolution will affect performance. Try lowering the time or resolution if you experience slowdowns.
                </div>
                :
                null
            }
        </div>
    }
}