import channel from "qoc/channel";
import solve from "qoc/solver";
import store from "qoc/store";

export default function simulate() {
    // TODO: Separate constants from initial values
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

    console.log(equations);
    console.log(parameters);
    const result = solve(equations, parameters, 10, 250);

    channel.publish(channel.SIMULATE, result);

    return result;
};