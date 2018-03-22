import cuid from "cuid";
import PropTypes from "prop-types";
import React from "react";

import "./LabeledNumberInput.styl";

export default class LabeledNumberInput extends React.Component {
    // TODO: Add min/max props

    static defaultProps = {
        name: "",
        label: "",
        max: Infinity,
        min: -Infinity,
        onChange: () => undefined,
        unit: "",
        value: 1,
    };

    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        max: PropTypes.number,
        min: PropTypes.number,
        onChange: PropTypes.func,
        unit: PropTypes.string,
        value: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.id = "input" + cuid();
    }

    handleChange = (ev) => {
        // Strip leading zeros
        // Workaround for https://github.com/facebook/react/issues/9402
        // TODO: Solidify this. Currently fails when typing things like 0.0.
        ev.target.value = ev.target.value.replace(/^0+/, "");
        if (ev.target.value.charAt(0) === ".") {
            ev.target.value = "0" + ev.target.value;
        }
        else if (ev.target.value === "") {
            ev.target.value = "0";
        }

        // const value = parseFloat(ev.target.value)|| 0;
        // ev.target.value = value.toString();

        this.props.onChange(ev);
    };

    render() {
        return <div className="labeledInput">
            <div className="label">
                <label htmlFor={this.id}>{this.props.label}:</label>
            </div>
            <div className="expression">
            <input type="number"
                   id={this.id}
                   className={this.props.value}
                   max={this.props.max}
                   min={this.props.min}
                   name={this.props.name}
                   onChange={this.handleChange}
                   value={this.props.value} />
            </div>
            {this.props.unit ?
                <div className="unit">{this.props.unit}</div>
                : null}
        </div>
    }
}