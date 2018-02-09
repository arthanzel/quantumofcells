import postal from "postal";

import solve from "qoc/solver";
import store from "qoc/store";

const qocChannel = postal.channel("qoc");

export default function simulate() {
    const state = store.getState();

    // We have an array of objects that represent equations and parameters.
    // Transform those into a map.
    const equations = {};
    for (let eqn of state.equations) {
        equations[eqn.symbol] = eqn.expression;
    }
    const parameters = {};
    for (let param of state.parameters) {
        parameters[param.symbol] = parseFloat(param.expression);
    }

    const result = solve(equations, parameters, 10, 250, parameters);
    return result;
};