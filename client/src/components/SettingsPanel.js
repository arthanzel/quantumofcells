import React from "react";

export default class SettingsPanel extends React.Component {
    render() {
        return <div>
            <h2>Settings</h2>
            <label for="inputTime">End Time</label>
            <input type="text" id="inputTime" />
        </div>
    }
}