import React from "react";

import simulate from "qoc/simulator";

export default class SimulateButton extends React.Component {
    render() {
        return <a href="#" className="btn btn-primary" onClick={simulate}>Simulate</a>
    }
}