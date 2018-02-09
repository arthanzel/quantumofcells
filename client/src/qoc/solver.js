import evaluatex from "evaluatex/evaluatex";

/**
 *
 * @param eqns Map of differential equations.
 * @param initials Map of initial values and parameters.
 * @param time How many time units to run the simulation.
 * @param resolution How many calculations per time unit. Higher is more accurate, but slower.
 * @param locals Map of any constant values to be compiled into the function
 * @returns {{ts: *[], data: {}}}
 */
export default function solver(eqns, initials, time, resolution, locals = {}) {
    // Clone objects to avoid side-effects
    eqns = Object.assign({}, eqns);
    let vars = Object.assign({}, initials);
    if (!vars.t) {
        vars.t = 0;
    }

    if (typeof eqns === "string") {
        eqns = { x: eqns };
    }

    // Compile equations
    for (let v in eqns) {
        if (!vars[v]) {
            // Set initial condition to zero if it is missing.
            // TODO: emit a warning
            vars[v] = 0;
        }

        eqns[v] = evaluatex(eqns[v], locals);
    }

    // Set up the data structure.
    // This is an array of time-value pairs keyed to the equation in question.
    let data = {};
    for (let v in eqns) {
        data[v] = [];
        data[v].push([vars.t, vars[v]]);
    }

    let ts = [vars.t];

    for (let step = 1; step <= time * resolution; step++) {
        let t = step / resolution;
        ts.push(t);

        let newVars = { t: t };

        for (let v in eqns) {
            let fn = eqns[v];
            let rate = fn(vars);
            let result = vars[v] + rate / resolution;
            newVars[v] = result;
            data[v].push([t, result]);
        }

        vars = newVars;
    }

    return { ts: ts, data: data };
};