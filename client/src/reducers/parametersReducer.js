import actions from "./actions";
import uid from "../qoc/uid";

export default function(parameters = [], action) {
    let copy = []; // Prevent duplicate assignment warnings by hoisting the definition here

    switch (action.type) {
        case actions.ADD_PARAM:
            copy = parameters.slice();
            copy.push({ symbol: "", expression: "", _id: uid() });
            return copy;
        case actions.DELETE_PARAM:
            return parameters.filter(eqn => {
                return eqn._id !== action._id;
            });
        case actions.LOAD_PARAMS:
            return action.parameters.map((param) => {
                param._id = param._id || uid();
                return param;
            });
        case actions.UPDATE_PARAM:
            return parameters.map(param => {
                if (action._id && param._id === action._id) {
                    return {
                        symbol: action.symbol !== undefined ? action.symbol : param.symbol,
                        expression: action.expression !== undefined ? action.expression : param.expression,
                        _id: action._id
                    };
                }
                return param;
            });
        default:
            return parameters;
    }
};