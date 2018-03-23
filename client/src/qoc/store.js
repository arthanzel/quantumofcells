import { createStore } from "redux";
import request from "superagent";

import actions from "reducers/actions";
import sampleProjects from "qoc/sampleProjects";
import rootReducer from "reducers";
import { isLoginValid } from "./util/authUtils";
import { serverPath } from "qoc/util/dataUtils";
import { accessToken } from "./util/authUtils";

/*
    State schema:
    ====================

    EQUATION: { symbol: String(1..2), expression: String, _id: String }

    PROJECT: { name: String, _id: String }

    {
        equations: [
            EQUATION
            ...
        ],
        parameters: [
            EQUATION,
            ...
        ],
        projects: [
            PROJECT,
            ...
        ],
        name: String,
        resolution: Integer,
        time: Decimal,
        user: {
            accessToken: String,
            expireDate: Date,
            name: String
        }
    }
 */

let initialState = {
    equations: [],
    parameters: [],
    projects: [],
    name: "",
    projectId: "",
    resolution: 100,
    time: 10,
    user: {}
};

const store = createStore(rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;

const initialProject = sampleProjects.find((proj) => proj.name === "Sample: Logistic Growth");
store.dispatch({ type: actions.LOAD_PROJECT, project: initialProject });

// Observable-style function to subscribe to state changes
export const listen = function(listener) {
    return store.subscribe(() => {
        listener(store.getState());
    });
};

// Save project
let saveTimeout = 0;
store.subscribe(() => {
    // TODO: Optimize project saving
    // TODO: How to tell if loaded project is a sample?
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveProject, 1000);
});

function saveProject() {
    console.log("Saving");

    const state = store.getState();
    if (state.projectId && isLoginValid()) {
        const body = {
            equations: state.equations,
            parameters: state.parameters,
            time: state.time,
            resolution: state.resolution
        };

        request.put(serverPath("/projects/" + state.projectId))
            .set("Authorization", "Bearer " + accessToken())
            .send(body)
            .then((res) => {
                console.log("Saved!", res);
            })
            .catch((err) => {
                console.error("Save Error!", err);
            });
    }
}
