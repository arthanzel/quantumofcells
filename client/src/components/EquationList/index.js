import React from "react";

import EquationBox from "../EquationBox";

export default class EquationList extends React.Component {
    constructor(props) {
        super(props);

        // TODO: Get state from Redux
        this.state = {equations: [{symbol: "S", expression: "c*R - a*S*I"}]};
    }

    render() {
        const eqnBoxes = this.state.equations.map((eqn, idx) => {
            return <EquationBox symbol={eqn.symbol} expression={eqn.expression}
                                key={idx}/>;
        });

        return <div>
            <h2>Equations</h2>
            {eqnBoxes}
        </div>
    }
}