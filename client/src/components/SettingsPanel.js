import React from "react";

import actions from "reducers/actions";
import LabeledNumberInput from "./LabeledNumberInput";
import SimulateButton from "./SimulateButton";
import store from "qoc/store";

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
        const value = parseInt(e.target.value);
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
                <h2>Settings</h2>
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
                onChange={this.onChange} />

            <div className="controls">
                <SimulateButton />
            </div>
        </div>
    }
}