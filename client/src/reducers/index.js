import { combineReducers } from "redux";

import actions from "./actions";
import equationsReducer from "./equationsReducer";
import parametersReducer from "./parametersReducer";
import authReducer from "./authReducer";

export default function rootReducer(state = {}, action) {
    if (action.type === actions.LOAD_PROJECT) {
        const newState = Object.assign({}, state);
        newState.equations = equationsReducer([], { type: actions.LOAD_EQUATIONS, equations: action.project.equations });
        newState.parameters = parametersReducer([], { type: actions.LOAD_PARAMS, parameters: action.project.parameters });
        newState.time = action.project.time || state.time;
        newState.resolution = action.project.resolution || state.resolution;
        return newState;
    }
    else {
        return combineReducers({
            equations: equationsReducer,
            parameters: parametersReducer,
            projects: projectsReducer,
            resolution: simpleNumberReducer(actions.SET_RESOLUTION),
            time: simpleNumberReducer(actions.SET_TIME),
            user: authReducer
        })(state, action);
    }
};

export function identity(defaultValue = {}) {
    return function(state = defaultValue, action) {
        return state;
    };
}

function projectsReducer(projects = [], action) {
    if (action.type === actions.LOAD_PROJECTS) {
        return action.projects;
    }
    return projects;
}

function simpleNumberReducer(actionType) {
    return (oldValue = 0, action) => {
        if (action.type === actionType) {
            if (action.value === "") {
                return 0;
            }
            return action.value;
        }
        return oldValue;
    };
}