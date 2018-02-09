import React from "react";
import postal from "postal";

import actions from "reducers/actions";
import store from "qoc/store";

import EquationBox from "../EquationBox";
import "./EquationList.styl";

const qocChannel = postal.channel("qoc");

export default class EquationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                equations: store.getState().equations,
                parameters: store.getState().parameters
            });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe !== undefined) {
            this.unsubscribe();
        }
    }

    // region Equation events

    onAddEquation() {
        store.dispatch({ type: actions.ADD_EQUATION });
    }

    onDeleteEquation(id) {
        store.dispatch({ type: actions.DELETE_EQUATION, id: id });
    }

    onUpdateEquation(id, symbol, expression) {
        store.dispatch({
            type: actions.UPDATE_EQUATION, id: id, symbol: symbol, expression: expression
        })
    }

    // endregion

    onSimulate = () => {
        qocChannel.publish("simulate", {
            data: "data goes here"
        });
    };

    render() {
        const equationBoxes = this.state.equations.map(eqn => {
            return <EquationBox symbol={eqn.symbol}
                                expression={eqn.expression}
                                key={eqn.id}
                                onUpdate={(sym, expr) => this.onUpdateEquation(eqn.id, sym, expr)}
                                onDelete={() => this.onDeleteEquation(eqn.id)}
                                validatable={true} />;
        });
        const parameterBoxes = this.state.parameters.map(param => {
            return <EquationBox symbol={param.symbol}
                                expression={param.expression}
                                key={param.id}
                                validatable={true} />
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
                    <a href="#" className="btn btn-primary btn-sm" onClick={this.onAddEquation}>Add Constant</a>
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