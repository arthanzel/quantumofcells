import {combineReducers} from "redux";
import equations from "./equationsReducer";

export default combineReducers({
    equations,
    parameters:     identity([]),
    resolution:     identity(1),
    time:           identity(1.0)
});

export function identity(defaultValue = {}) {
    return function(state = defaultValue, action) { return state; };
}
