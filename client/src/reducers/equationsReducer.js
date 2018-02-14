import actions from "./actions";
import uid from "../qoc/uid";

export default function(equations = [], action) {
    let copy = []; // Prevent duplicate assignment warnings by hoisting the definition here

    switch (action.type) {
        case actions.ADD_EQUATION:
            copy = equations.slice();
            copy.push({ symbol: "", expression: "", id: uid() });
            return copy;
        case actions.DELETE_EQUATION:
            return equations.filter(eqn => {
                return eqn.id !== action.id;
            });
        case actions.LOAD_EQUATIONS:
            return action.equations;
        case actions.UPDATE_EQUATION:
            return equations.map(eqn => {
                if (action.id && eqn.id === action.id) {
                    return {
                        symbol: action.symbol || eqn.symbol,
                        expression: action.expression,
                        id: action.id
                    };
                }
                return eqn;
            });
        default:
            return equations;
    }
};