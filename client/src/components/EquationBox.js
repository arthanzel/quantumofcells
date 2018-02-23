import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import evaluatex from "evaluatex/evaluatex"

import "./EquationBox.styl";

const VALIDATION_TIMEOUT_MS = 1000;

export default class EquationBox extends React.Component {
    static defaultProps = {
        expression: "",
        onChangeExpression: () => undefined,
        onChangeSymbol: () => undefined,
        onDelete: () => undefined,
        symbol: "",
        validate: false
    };

    static propTypes = {
        expression: PropTypes.string,
        onChangeExpression: PropTypes.func,
        onChangeSymbol: PropTypes.func,
        onDelete: PropTypes.func,
        symbol: PropTypes.string,
        validate: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidMount() {
        this.queueValidation();
    }

    componentWillUnmount() {
        clearTimeout(this.validationTimeout);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.symbol !== nextProps.symbol ||
            this.props.expression !== nextProps.expression) {
            this.queueValidation();
        }
    }

    queueValidation = () => {
        if (this.props.validate) {
            clearTimeout(this.validationTimeout);
            this.validationTimeout = setTimeout(this.validate, VALIDATION_TIMEOUT_MS);
        }
    };

    validate = () => {
        try {
            evaluatex(this.props.expression);
            evaluatex(this.props.symbol); // TODO: Symbol should match a regex, not pass evaluatex()
            this.setState({ hasError: false });
        }
        catch (e) {
            this.setState({ hasError: true });
        }
    };

    render() {
        return <div className={`equationBox ${this.state.hasError ? "error" : ""}`}>
            <div className="symbol">
                <input type="text" maxLength="2" size="4" value={this.props.symbol}
                       onChange={(e) => this.props.onChangeSymbol(e.target.value)} />
            </div>
            <div className="equals">=</div>
            <div className="expression">
                <input type="text" value={this.props.expression}
                       onChange={(e) => this.props.onChangeExpression(e.target.value)} />
            </div>
            <FontAwesomeIcon icon="times" className="icon" onClick={this.props.onDelete} />
        </div>
    }
}