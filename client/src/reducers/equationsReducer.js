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
            // TODO: Use filter instead of indexes
            copy = equations.slice();
            copy.splice(action.index, 1);
            return copy;
        case actions.EDIT_EQUATION:
            // TODO: Use map instead of indexes
            copy = equations.slice();
            copy[action.index] = action.equation;
            return copy;
        case actions.LOAD_EQUATIONS:
            return action.equations;
        default:
            return equations;
    }
};