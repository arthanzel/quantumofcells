import cuid from "cuid";
import PropTypes from "prop-types";
import React from "react";

import "./LabeledInput.styl";

export default class LabeledInput extends React.Component {
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
        value: PropTypes.string
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
            <input type="text"
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