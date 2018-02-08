import React from "react";

import actions from "reducers/actions";
import store from "qoc/store";
import uid from "qoc/uid";

import EquationBox from "../EquationBox";

export default class EquationList extends React.Component {
    static DEFAULT_EQNS = [
        { symbol: "S", expression: "c*R - a*S*I", id: uid() },
        { symbol: "I", expression: "a*S*I - b*I", id: uid() },
        { symbol: "R", expression: "b*I - c*R", id: uid() }
    ];

    constructor(props) {
        super(props);
        this.state = { equations: [] };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ equations: store.getState().equations })
        });
        store.dispatch({ type: actions.LOAD_EQUATIONS, equations: EquationList.DEFAULT_EQNS });
    }

    componentWillUnmount() {
        if (this.unsubscribe !== undefined) {
            this.unsubscribe();
        }
    }

    onAdd() {
        store.dispatch({ type: actions.ADD_EQUATION });
    }

    onDelete(id) {
        store.dispatch({ type: actions.DELETE_EQUATION, id: id });
    }

    onUpdate(id, symbol, expression) {
        store.dispatch({
            type: actions.UPDATE_EQUATION, id: id, symbol: symbol, expression: expression
        })
    }

    render() {
        const eqnBoxes = this.state.equations.map(eqn => {
            return <EquationBox symbol={eqn.symbol} expression={eqn.expression}
                                key={eqn.id}
                                onUpdate={(sym, expr) => this.onUpdate(eqn.id, sym, expr)}
                                onDelete={() => this.onDelete(eqn.id)} />;
        });

        return <div>
            <h2>Equations</h2>
            <a href="#" onClick={this.onAdd}>Add Equation</a>
            <div className="equationList">
                {eqnBoxes}
            </div>

            <h2>Parameters</h2>
            <div className="equationList">
                <EquationBox symbol="S" expression="0.95" />
                <EquationBox symbol="I" expression="0.05" />
                <EquationBox symbol="R" expression="0" />
                <EquationBox symbol="a" expression="0.016" />
                <EquationBox symbol="b" expression="0.2" />
                <EquationBox symbol="c" expression="0.01" />
            </div>
        </div>
    }
}