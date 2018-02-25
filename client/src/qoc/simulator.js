import channel from "qoc/channel";
import solve from "qoc/solver";
import store from "qoc/store";

// TODO: Add error callback to simulator
export default function simulate(errorCallback) {
    const state = store.getState();

    // Transform the equations list into an object indexed by the symbol field.
    // This facilitates lookups later.
    const equationsMap = state.equations.reduce((map, eqn) => {
        map[eqn.symbol] = eqn.expression;
        return map;
    }, {});

    // Split the parameters list into initial values and constants.
    // Initial values have symbols that appear in the equations list. Constants do not.
    // We split these because Evaluatex can compile constants and be slightly faster for it.
    const initialValuesMap = {}, constantsMap = {};
    state.parameters.forEach((param) => {
        if (equationsMap[param.symbol] === undefined) {
            constantsMap[param.symbol] = parseFloat(param.expression);
        }
        else {
            initialValuesMap[param.symbol] = parseFloat(param.expression);
        }
    });

    // TODO: Solver should run in a worker
    const result = solve(
        equationsMap,
        initialValuesMap,
        state.time || 50,
        state.resolution || 100,
        constantsMap);

    channel.publish(channel.SIMULATE, result);

    return result;
};