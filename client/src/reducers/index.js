import _ from "lodash";

import { combineReducers } from "redux";

import actions from "./actions";
import equationsReducer from "./equationsReducer";
import parametersReducer from "./parametersReducer";
import authReducer from "./authReducer";

export default function rootReducer(state = {}, action) {
    if (action.type === actions.LOAD_PROJECT) {
        const newState = Object.assign({}, state);
        newState.projectId = action.project._id;
        newState.name = action.project.name;
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
            name: identity(""),
            projectId: identity(""),
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
    else if (action.type === actions.ADD_PROJECT) {
        return _.sortBy(projects.concat(action.project), (project) => project.name);
    }
    else if (action.type === actions.DELETE_PROJECT) {
        return projects.filter((project) => project._id !== action._id);
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