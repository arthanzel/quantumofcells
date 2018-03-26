import _ from "lodash";
import { messageChannel as channel, MESSAGE_SIMULATE, makeToast } from "qoc/util/notifyUtils";
import solve from "qoc/solver";
import store from "qoc/store";

import evaluatex from "evaluatex/evaluatex";

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

    // Check initial values
    state.equations.forEach((eqn) => {
        if (!state.parameters.find((param) => param.symbol === eqn.symbol)) {
            makeToast(`Missing an initial condition for <code>${ eqn.symbol }</code>.`);
        }
    });

    const compiledEquations = _.mapValues(equationsMap, (expr) => {
        return evaluatex(expr, constantsMap);
    });

    // TODO: Solver should run in a worker
    // TODO: Add error/warning callback
    // TODO: Check for the presence of initial values in the solve() function
    try {
        const solution = solve(
            compiledEquations,
            initialValuesMap,
            state.time,
            state.resolution);

        channel.publish(MESSAGE_SIMULATE, { title: store.getState().name, solution: solution });
    }
    catch (e) {
        console.error(e);
        makeToast("Something went wrong with running your equations. Make sure that there aren't any typos, divide-by-zeros, or domain errors.");
    }
};