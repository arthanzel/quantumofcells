import { createStore } from "redux";

import rootReducer from "reducers";

const initialState = {
    equations: []
};

const store = createStore(rootReducer, initialState);
export default store;

store.subscribe(() => console.log(store.getState()));

// Observable-style function to subscribe to state changes
export const listen = function(listener) {
    return store.subscribe(() => { listener(store.getState()); });
};