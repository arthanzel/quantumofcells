import { createStore } from "redux";

import * as examples from "./examples";
import rootReducer from "reducers";

/*
    State schema:
    ====================

    EQUATION: { symbol: String(1..2), expression: String, id: Integer }

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
    resolution: 100,
    time: 10,
    user: {}
};
initialState = Object.assign(initialState, examples.sir);

const store = createStore(rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;

// Observable-style function to subscribe to state changes
export const listen = function(listener) {
    return store.subscribe(() => {
        listener(store.getState());
    });
};