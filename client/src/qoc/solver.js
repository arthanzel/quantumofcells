/**
 *
 * @param eqns Map of differential equations.
 * @param variables Map of initial values and variables.
 * @param time How many time units to run the simulation.
 * @param resolution How many calculations per time unit. Higher is more accurate, but slower.
 * @returns {{t: *[], series: {}}}
 */
export default function solver(eqns, variables, time, resolution) {
    // Clone objects to avoid side-effects
    let vars = Object.assign({}, variables);
    if (!vars.t) {
        vars.t = 0;
    }

    // Check initial conditions
    for (const v in eqns) {
        if (vars[v] === undefined) {
            // Set initial condition to zero if it is missing.
            // TODO: emit a warning
            vars[v] = 0;
        }
    }

    // Set up the data structure.
    // This is an array of time-value pairs keyed to the equation in question.
    const data = {};
    for (const v in eqns) {
        data[v] = [];
        data[v].push([vars.t, vars[v]]);
    }

    const tValues = [vars.t];

    for (let step = 1; step <= time * resolution; step++) {
        const t = step / resolution;
        tValues.push(t);

        const state = Object.assign({}, vars); // Current state of all variables
        state.t = t;

        for (const v in eqns) {
            const fn = eqns[v];
            const rate = fn(state);
            const result = state[v] + rate / resolution;
            state[v] = result;
            data[v].push([t, result]);
        }

        vars = state;
    }

    return { t: tValues, series: data };
};