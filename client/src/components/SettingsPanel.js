import React from "react";

import EquationBox from "./EquationBox";

export default class SettingsPanel extends React.Component {
    render() {
        return <div>
            <h2>Settings</h2>
            <EquationBox symbol="Time" expression="0" />
        </div>
    }
}