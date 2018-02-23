import React from "react";
import PropTypes from "prop-types";

import evaluatex from "evaluatex/evaluatex"

import "./EquationBox.styl";

const VALIDATION_TIMEOUT_MS = 1000;

const propTypes = {

};

export default class EquationBox extends React.Component {
    static defaultProps = {
        symbol: "",
        expression: "",
        validate: false
    };

    static propTypes = {
        symbol: PropTypes.string,
        expression: PropTypes.string,
        validate: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            symbol: this.props.symbol || "",
            expression: this.props.expression || "",
            hasError: false
        };
    }

    componentDidMount() {
        this.queueValidation();
    }

    componentWillUnmount() {
        clearTimeout(this.validationTimeout);
    }

    onChangeSymbol = (e) => {
        this.setState({ symbol: e.target.value }, this.update);
    };

    onChangeExpression = (e) => {
        this.setState({ expression: e.target.value }, this.update);
    };

    queueValidation = () => {
        if (this.props.validatable) {
            clearTimeout(this.validationTimeout);
            this.validationTimeout = setTimeout(this.validate, VALIDATION_TIMEOUT_MS);
        }
    };

    update = () => {
        if (this.props.onUpdate !== undefined) {
            this.props.onUpdate(this.state.symbol, this.state.expression);
        }

        this.queueValidation();
    };

    validate = () => {
        try {
            evaluatex(this.state.expression);
            evaluatex(this.state.symbol);
            this.setState({ hasError: false });
        }
        catch (e) {
            this.setState({ hasError: true });
        }
    };

    render() {
        let validationClass = this.state.hasError ? "error" : "";
        return <div className={`equationBox ${validationClass}`}>
            <div className="symbol">
                <input type="text" maxLength="2" size="4" value={this.state.symbol} onChange={this.onChangeSymbol}/>
            </div>
            <div className="equals">=</div>
            <div className="expression">
                <input type="text" value={this.state.expression} onChange={this.onChangeExpression}/>
            </div>
            <i className="fa fa-trash" onClick={this.props.onDelete} />
        </div>
    }
}