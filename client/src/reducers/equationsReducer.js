import actions from "./actions";
import uid from "../qoc/uid";

export default function(equations = [], action) {
    let copy = []; // Prevent duplicate assignment warnings by hoisting the definition here

    switch (action.type) {
        case actions.ADD_EQUATION:
            copy = equations.slice();
            copy.push({ symbol: "", expression: "", _id: uid() });
            return copy;
        case actions.DELETE_EQUATION:
            return equations.filter(eqn => {
                return eqn._id !== action._id;
            });
        case actions.LOAD_EQUATIONS:
            return action.equations.map(eqn => {
                eqn._id = eqn._id || uid();
                return eqn;
            });
        case actions.UPDATE_EQUATION:
            return equations.map(eqn => {
                if (action._id && eqn._id === action._id) {
                    return {
                        symbol: action.symbol !== undefined ? action.symbol : eqn.symbol,
                        expression: action.expression !== undefined ? action.expression : eqn.expression,
                        _id: action._id
                    };
                }
                return eqn;
            });
        default:
            return equations;
    }
};