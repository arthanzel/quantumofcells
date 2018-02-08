import React from "react";

import actions from "reducers/actions";
import store from "qoc/store";
import uid from "qoc/uid";

import EquationBox from "../EquationBox";

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
        const equationBoxes = this.state.equations.map(eqn => {
            return <EquationBox symbol={eqn.symbol}
                                expression={eqn.expression}
                                key={eqn.id}
                                onUpdate={(sym, expr) => this.onUpdate(eqn.id, sym, expr)}
                                onDelete={() => this.onDelete(eqn.id)} />;
        });
        const parameterBoxes = this.state.parameters.map(param => {
            return <EquationBox symbol={param.symbol}
                                expression={param.expression}
                                key={param.id} />
        });

        return <div>
            <h2>Equations</h2>
            <a href="#" onClick={this.onAdd}>Add Equation</a>
            <div className="equationList">
                {equationBoxes}
            </div>

            <h2>Parameters</h2>
            <div className="parameterList">
                {parameterBoxes}
            </div>
        </div>
    }
}