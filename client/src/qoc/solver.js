import evaluatex from "evaluatex/evaluatex";

/**
 *
 * @param eqns Map of differential equations.
 * @param variables Map of initial values and variables.
 * @param time How many time units to run the simulation.
 * @param resolution How many calculations per time unit. Higher is more accurate, but slower.
 * @param constants Map of any constant values to be compiled into the function.
 * @returns {{ts: *[], series: {}}}
 */
export default function solver(eqns, variables, time, resolution, constants = {}) {
    // Variables may vary over the course of the simulation.
    // Constants do not; they are compiled into the AST.

    if (typeof eqns === "string") {
        // If only one equation is given as a string
        eqns = { x: eqns };
    }

    // Clone objects to avoid side-effects
    eqns = Object.assign({}, eqns);
    let vars = Object.assign({}, variables);
    if (!vars.t) {
        vars.t = 0;
    }

    // Compile equations
    for (let v in eqns) {
        if (vars[v] === undefined) {
            // Set initial condition to zero if it is missing.
            // TODO: emit a warning
            vars[v] = 0;
        }

        eqns[v] = evaluatex(eqns[v], constants);
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

        const newVars = Object.assign(vars);
        newVars.t = t;

        for (let v in eqns) {
            let fn = eqns[v];
            let rate = fn(vars);
            let result = vars[v] + rate / resolution;
            newVars[v] = result;
            data[v].push([t, result]);
        }

        vars = newVars;
    }

    return { ts: ts, series: data };
};