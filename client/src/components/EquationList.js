import React from "react";

import actions from "reducers/actions";
import store from "qoc/store";

import EquationBox from "./EquationBox";
import SimulateButton from "./SimulateButton";

import "./EquationList.styl";

export default class EquationList extends React.Component {
    constructor(props) {
        super(props);
        const state = store.getState();
        this.state = {
            equations: state.equations,
            parameters: state.parameters,
            name: state.name
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            // TODO: check equality?
            this.setState({
                equations: store.getState().equations,
                parameters: store.getState().parameters,
                name: store.getState().name
            });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    // region Equation events

    onAddEquation() {
        store.dispatch({ type: actions.ADD_EQUATION });
    }

    onChangeExpression(eqn, expression) {
        store.dispatch({ type: actions.UPDATE_EQUATION, _id: eqn._id, expression: expression });
    }

    onChangeSymbol(eqn, symbol) {
        store.dispatch({ type: actions.UPDATE_EQUATION, _id: eqn._id, symbol: symbol });
    }

    onDeleteEquation(eqn) {
        store.dispatch({ type: actions.DELETE_EQUATION, _id: eqn._id });
    }

    // endregion

    // region Parameter events

    onAddParameter() {
        store.dispatch({ type: actions.ADD_PARAM });
    }

    onChangeParameterExpression(param, expression) {
        store.dispatch({ type: actions.UPDATE_PARAM, _id: param._id, expression: expression });
    }

    onChangeParameterSymbol(param, symbol) {
        store.dispatch({ type: actions.UPDATE_PARAM, _id: param._id, symbol: symbol });
    }

    onDeleteParameter(param) {
        store.dispatch({ type: actions.DELETE_PARAM, _id: param._id });
    }

    // endregion

    render() {
        const equationBoxes = this.state.equations.map(eqn => {
            return <EquationBox symbol={eqn.symbol}
                                expression={eqn.expression}
                                key={eqn._id}
                                onChangeSymbol={(sym) => this.onChangeSymbol(eqn, sym)}
                                onChangeExpression={(expr) => this.onChangeExpression(eqn, expr)}
                                onDelete={() => this.onDeleteEquation(eqn)}
                                separator="<strong>'</strong> ="
                                validate={true} />;
        });
        const parameterBoxes = this.state.parameters.map(param => {
            return <EquationBox symbol={param.symbol}
                                expression={param.expression}
                                key={param._id}
                                onChangeSymbol={(sym) => this.onChangeParameterSymbol(param, sym)}
                                onChangeExpression={(expr) => this.onChangeParameterExpression(param, expr)}
                                onDelete={() => this.onDeleteParameter(param)}
                                validate={true} />
        });

        return <div className="equationContainer">
            <h2>{this.state.name}</h2>

            <section>
                <header>
                    <h3>Equations</h3>
                    <a href="#" className="btn btn-primary btn-sm" onClick={this.onAddEquation}>Add Equation</a>
                </header>
                <div className="equationList">
                    {equationBoxes}
                </div>
            </section>

            <section>
                <header>
                    <h3>Constants</h3>
                    <a href="#" className="btn btn-primary btn-sm" onClick={this.onAddParameter}>Add Constant</a>
                </header>
                <div className="parameterList">
                    {parameterBoxes}
                </div>
            </section>

            <div className="controls">
                <SimulateButton />
            </div>
        </div>
    }
}