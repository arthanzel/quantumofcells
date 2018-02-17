import { combineReducers } from "redux";
import equationsReducer from "./equationsReducer";
import authReducer from "./authReducer";

export default combineReducers({
    equations: equationsReducer,
    parameters: identity([]),
    resolution: identity(1),
    time: identity(1.0),
    user: authReducer
});

export function identity(defaultValue = {}) {
    return function(state = defaultValue, action) {
        return state;
    };
}
