import _ from "lodash";
import { messageChannel as channel, MESSAGE_SIMULATE, clearToasts, makeToast } from "qoc/util/notifyUtils";
import solve from "qoc/solver";
import store from "qoc/store";

import evaluatex from "evaluatex/evaluatex";

const MAX_DATA_POINTS = 2001; // The extra 1 fits the very last data point at the upper bound

// TODO: Add error callback to simulator
export default function simulate(errorCallback) {
    clearToasts();

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
            makeToast(`Missing an initial condition for <code>${ eqn.symbol }</code>`);
        }
    });

    const compiledEquations = _.mapValues(equationsMap, (expr) => {
        return evaluatex(expr, constantsMap);
    });

    // TODO: Solver should run in a worker
    // TODO: Add error/warning callback
    // TODO: Check for the presence of initial values in the solve() function
    try {
        let solution = solve(
            compiledEquations,
            initialValuesMap,
            state.time,
            state.resolution);

        if (solution.t.length > MAX_DATA_POINTS) {
            const newSolution = { t: [], series: {} };
            for (const key in solution.series) {
                newSolution.series[key] = [];
            }

            for (let i = 0; i <= MAX_DATA_POINTS; i++) {
                // Condense very large solutions into at most MAX_DATA_POINTS points.
                const index = Math.floor(i / MAX_DATA_POINTS * (solution.t.length - 1));
                const t = solution.t[index];
                newSolution.t.push(t);
                for (const key in solution.series) {
                    newSolution.series[key].push(solution.series[key][index]);
                }
            }

            solution = newSolution;
        }

        channel.publish(MESSAGE_SIMULATE, { title: store.getState().name, solution: solution });
    }
    catch (e) {
        console.error(e);
        makeToast("Something went wrong with running your equations. Make sure that there aren't any typos, divide-by-zeros, or domain errors.");
    }
};