import React from "react";

import "./EquationBox.styl";

export default class EquationBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: this.props.symbol || "",
            expression: this.props.expression || ""
        };
    }

    onChangeSymbol = (e) => {
        this.setState({ symbol: e.target.value }, this.update);
    };

    onChangeExpression = (e) => {
        this.setState({ expression: e.target.value }, this.update);
    };

    update = () => {
        if (this.props.onUpdate !== undefined) {
            this.props.onUpdate(this.state.symbol, this.state.expression);
        }
    };

    render() {
        return <div className="equationBox">
            <div className="symbol">
                <input type="text" maxLength="2" size="3" value={this.state.symbol} onChange={this.onChangeSymbol}/>
            </div>
            <div className="expression">
                <input type="text" value={this.state.expression} onChange={this.onChangeExpression}/>
            </div>
            <i className="fa fa-trash" onClick={this.props.onDelete} />
        </div>
    }
}