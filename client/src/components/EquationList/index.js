import React from "react";

import actions from "reducers/actions";
import store from "qoc/store";
import uid from "qoc/uid";

import EquationBox from "../EquationBox";

export default class EquationList extends React.Component {
    static DEFAULT_EQNS = [
        {symbol: "S", expression: "c*R - a*S*I", id: uid()},
        {symbol: "I", expression: "a*S*I - b*I", id: uid()},
        {symbol: "R", expression: "b*I - c*R", id: uid()}
    ];

    constructor(props) {
        super(props);
        this.state = { equations: [] };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({equations: store.getState().equations})
        });
        store.dispatch({ type: actions.LOAD_EQUATIONS, equations: EquationList.DEFAULT_EQNS });
    }

    componentWillUnmount() {
        if (this.unsubscribe !== undefined) {
            this.unsubscribe();
        }
    }

    onDelete = (index) => {
        /*
        FIXME
        the delete isn't working because the key is bound to the array index.
        When you delete an equation, another element replaces into that key.
        This makes React think that the item didn't change and it doesn't update the UI.
        Fix: Give equations an id on creation.
         */
        store.dispatch({ type: actions.DELETE_EQUATION, index: index });
    };

    onUpdate = (index, symbol, expression) => {
        // Treat the state as if it were immutable
        // const eqnsCopy = this.state.equations.slice();
        // eqnsCopy[key] = { symbol: symbol, expression: expression };
        // this.setState({ equations: eqnsCopy });
        store.dispatch({
            type: actions.EDIT_EQUATION,
            index: index,
            equation: Object.assign(this.state.equations[index], { symbol: symbol, expression: expression })
        });
    };

    render() {
        const eqnBoxes = this.state.equations.map((eqn, idx) => {
            return <EquationBox symbol={eqn.symbol} expression={eqn.expression}
                                key={eqn.id}
                                onUpdate={(sym, expr) => this.onUpdate(idx, sym, expr)}
                                onDelete={() => this.onDelete(idx)}/>;
        });

        return <div>
            <h2>Equations</h2>
            {eqnBoxes}
        </div>
    }
}