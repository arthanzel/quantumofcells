import React from "react";

import simulate from "qoc/simulator";

export default class SimulateButton extends React.Component {
    render() {
        return <div className="controls">
            <a href="#" className="btn btn-primary" onClick={simulate}>Simulate</a>
        </div>
    }
}