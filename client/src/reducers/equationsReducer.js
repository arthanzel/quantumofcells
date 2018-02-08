import actions from "./actions";

export default function(equations = [], action) {
    let copy = []; // Prevent duplicate assignment warnings by hoisting the definition here

    switch (action.type) {
        case actions.DELETE_EQUATION:
            copy = equations.slice();
            copy.splice(action.index, 1);
            return copy;
        case actions.EDIT_EQUATION:
            copy = equations.slice();
            copy[action.index] = action.equation;
            return copy;
        case actions.LOAD_EQUATIONS:
            return action.equations;
        default:
            return equations;
    }
};