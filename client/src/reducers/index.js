import {combineReducers} from "redux";
import equations from "./equationsReducer";

export default combineReducers({
    equations,
    parameters: function(state = [], action) {return state;} // TODO Implement parameter reducer
});