import { combineReducers } from "redux";
import equationsReducer from "./equationsReducer";
import parametersReducer from "./parametersReducer";
import authReducer from "./authReducer";

export default combineReducers({
    equations: equationsReducer,
    parameters: parametersReducer,
    resolution: identity(1),
    time: identity(1.0),
    user: authReducer
});

export function identity(defaultValue = {}) {
    return function(state = defaultValue, action) {
        return state;
    };
}
