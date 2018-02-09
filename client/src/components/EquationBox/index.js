import React from "react";

import evaluatex from "evaluatex/evaluatex"

import "./EquationBox.styl";

const VALIDATION_TIMEOUT_MS = 1000;

export default class EquationBox extends React.Component {
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
            console.log("validated " + this.state.expression);
        }
        catch (e) {
            console.log("did not validate " + this.state.expression);
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