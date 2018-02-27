import cuid from "cuid";
import PropTypes from "prop-types";
import React from "react";

import "./LabeledNumberInput.styl";

export default class LabeledNumberInput extends React.Component {
    // TODO: Add min/max props

    static defaultProps = {
        name: "",
        label: "",
        onChange: () => undefined,
        unit: "",
        value: "",
    };

    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        onChange: PropTypes.func,
        unit: PropTypes.string,
        value: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.id = "input" + cuid();
    }

    render() {
        return <div className="labeledInput">
            <div className="label">
                <label htmlFor={this.id}>{this.props.label}:</label>
            </div>
            <div className="expression">
            <input type="number"
                   id={this.id}
                   name={this.props.name}
                   onChange={this.props.onChange}
                   value={this.props.value} />
            </div>
            {this.props.unit ?
                <div className="unit">{this.props.unit}</div>
                : null}
        </div>
    }
}