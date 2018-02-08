import { createStore } from "redux";

import * as examples from "./examples";
import rootReducer from "reducers";

let initialState = {
    equations: [],
    parameters: []
};
initialState = Object.assign(initialState, examples.sir);

const store = createStore(rootReducer, initialState);
export default store;

store.subscribe(() => console.log(store.getState()));

// Observable-style function to subscribe to state changes
export const listen = function(listener) {
    return store.subscribe(() => { listener(store.getState()); });
};