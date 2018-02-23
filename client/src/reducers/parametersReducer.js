import actions from "./actions";
import uid from "../qoc/uid";

export default function(parameters = [], action) {
    let copy = []; // Prevent duplicate assignment warnings by hoisting the definition here

    switch (action.type) {
        case actions.ADD_PARAM:
            copy = parameters.slice();
            copy.push({ symbol: "", expression: "", id: uid() });
            return copy;
        case actions.DELETE_PARAM:
            return parameters.filter(eqn => {
                return eqn.id !== action.id;
            });
        case actions.LOAD_PARAMS:
            return action.parameters;
        case actions.UPDATE_PARAM:
            return parameters.map(param => {
                if (action.id && param.id === action.id) {
                    return {
                        symbol: action.symbol || param.symbol,
                        expression: action.expression || param.expression,
                        id: action.id
                    };
                }
                return param;
            });
        default:
            return parameters;
    }
};