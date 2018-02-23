import React from "react";

import actions from "reducers/actions";
import simulate from "qoc/simulator";
import store from "qoc/store";

import EquationBox from "./EquationBox";
import "./EquationList.styl";

export default class EquationList extends React.Component {
    constructor(props) {
        super(props);
        const state = store.getState();
        this.state = {
            equations: state.equations,
            parameters: state.parameters
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            // TODO: check equality?
            this.setState({
                equations: store.getState().equations,
                parameters: store.getState().parameters
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

    onChangeExpression(id, expression) {
        store.dispatch({ type: actions.UPDATE_EQUATION, id: id, expression: expression });
    }

    onChangeSymbol(id, symbol) {
        store.dispatch({ type: actions.UPDATE_EQUATION, id: id, symbol: symbol });
    }

    onDeleteEquation(id) {
        store.dispatch({ type: actions.DELETE_EQUATION, id: id });
    }

    // endregion

    // region Parameter events

    onAddParameter() {
        store.dispatch({ type: actions.ADD_PARAM });
    }

    onChangeParameterExpression(id, expression) {
        store.dispatch({ type: actions.UPDATE_PARAM, id: id, expression: expression });
    }

    onChangeParameterSymbol(id, symbol) {
        store.dispatch({ type: actions.UPDATE_PARAM, id: id, symbol: symbol });
    }

    onDeleteParameter(id) {
        store.dispatch({ type: actions.DELETE_PARAM, id: id });
    }

    // endregion

    onSimulate = () => {
        simulate();
    };

    render() {
        const equationBoxes = this.state.equations.map(eqn => {
            return <EquationBox symbol={eqn.symbol}
                                expression={eqn.expression}
                                key={eqn.id}
                                onChangeSymbol={(sym) => this.onChangeSymbol(eqn.id, sym)}
                                onChangeExpression={(expr) => this.onChangeExpression(eqn.id, expr)}
                                onDelete={() => this.onDeleteEquation(eqn.id)}
                                validate={true} />;
        });
        const parameterBoxes = this.state.parameters.map(param => {
            return <EquationBox symbol={param.symbol}
                                expression={param.expression}
                                key={param.id}
                                onChangeSymbol={(sym) => this.onChangeParameterSymbol(param.id, sym)}
                                onChangeExpression={(expr) => this.onChangeParameterExpression(param.id, expr)}
                                onDelete={() => this.onDeleteParameter(param.id)}
                                validate={true} />
        });

        return <div className="equationContainer">
            <section>
                <header>
                    <h2>Equations</h2>
                    <a href="#" className="btn btn-primary btn-sm" onClick={this.onAddEquation}>Add Equation</a>
                </header>
                <div className="equationList">
                    {equationBoxes}
                </div>
            </section>

            <section>
                <header>
                    <h2>Constants</h2>
                    <a href="#" className="btn btn-primary btn-sm" onClick={this.onAddParameter}>Add Constant</a>
                </header>
                <div className="parameterList">
                    {parameterBoxes}
                </div>
            </section>

            <div className="controls">
                <a href="#" className="btn btn-primary" onClick={this.onSimulate}>Simulate</a>
            </div>
        </div>
    }
}