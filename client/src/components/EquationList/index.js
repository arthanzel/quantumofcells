import React from "react";

import EquationBox from "../EquationBox";

export default class EquationList extends React.Component {
    static DEFAULT_EQNS = [
        { symbol: "S", expression: "c*R - a*S*I" },
        { symbol: "I", expression: "a*S*I - b*I" },
        { symbol: "R", expression: "b*I - c*R" }
    ];

    constructor(props) {
        super(props);
        console.log("Equation list created");

        // TODO: Get state from Redux
        this.state = {equations: EquationList.DEFAULT_EQNS};
    }

    onUpdate = (key, symbol, expression) => {
        console.log(key, symbol, expression);
    };

    render() {
        const eqnBoxes = this.state.equations.map((eqn, idx) => {
            return <EquationBox symbol={eqn.symbol} expression={eqn.expression}
                                key={idx} onUpdate={(sym, expr) => this.onUpdate(idx, sym, expr)}/>;
        });

        return <div>
            <h2>Equations</h2>
            {eqnBoxes}
        </div>
    }
}