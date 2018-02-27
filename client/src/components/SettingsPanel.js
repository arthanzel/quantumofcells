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
            startTime: state.startTime,
            endTime: state.endTime,
            resolution: state.resolution
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            const s = store.getState();
            if (this.state.startTime !== s.startTime) {
                this.setState({ startTime: s.startTime });
            }
            if (this.state.endTime !== s.endTime) {
                this.setState({ endTime: s.endTime });
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
        if (e.target.name === "startTime") {
            store.dispatch({ type: actions.SET_START_TIME, value: value })
        }
        else if (e.target.name === "endTime") {
            store.dispatch({ type: actions.SET_END_TIME, value: value })
        }
        else if (e.target.name === "resolution") {
            store.dispatch({ type: actions.SET_RESOLUTION, value: value })
        }
    };

    render() {
        return <div>
            <h2>Settings</h2>
            <LabeledNumberInput
                label="Start Time"
                value={this.state.startTime}
                name="startTime"
                min={0}
                max={this.state.endTime}
                onChange={this.onChange} />
            <LabeledNumberInput
                label="End Time"
                value={this.state.endTime}
                name="endTime"
                min={this.state.startTime}
                onChange={this.onChange} />
            <LabeledNumberInput
                label="Resolution"
                value={this.state.resolution}
                unit="samples/time"
                name="resolution"
                onChange={this.onChange} />

            <SimulateButton />
        </div>
    }
}