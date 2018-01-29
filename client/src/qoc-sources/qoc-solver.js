(function() {
    var module = angular.module("qoc-solver", []);

    module.factory("QOCSolver", function($parse) {
        var solver = {};

        /**
         * Solves a system of ordinary differential equations. 
         * This function takes an object or array of objects as the parameter `eqns`. Such an object represents a differential equation and must have the following properties:
         * 
         *     - `variable`: Name of the variable in the differential.
         *     - `expression`: String that represents the differential equation.
         * 
         * @param  {Array, Object} eqns An object describing a function, or array of functions to solve.
         * @param  {Object} vars Initial values of all constants or named variables as a hash.
         * @param  {Number} time Number of seconds to run the simulation.
         * @param  {Integer} resolution Number of steps per second. Higher values give greater precision.
         * @returns {Object} A hash containing the values solved variables over time. Each property is an array, which itself contains tuples of the form [time, value]. These tuples are suitable for plotting on an XY plane.
         */
        solver.solve = function(eqns, params, time, resolution) {
            // TODO: Add support for non-zero initial condition of t

            // Copy variables into its own object to avoid side-effects.
            // We don't want to overwrite properties in the `params` object that the user provides.
            params = angular.extend({}, params);
            params.t = 0;

            // These assignments allow objects to be accessed in expressions.
            // Expressions are parsed by Angular, which doesn't support things like Math out of the box.
            var locals = Math;

            // Make `eqns` an array of one if an object is provided.
            if (angular.isObject(eqns) && !angular.isArray(eqns)) {
                eqns = [eqns];
            }

            // Make 'eqns' an array of one if a string is provided.
            // This assumes the variable to integrate is called "x".
            else if (angular.isString(eqns)) {
                eqns = [{ variable: "x", expression: eqns }];
            }

            // This object will hold the data series for each equation.
            var data = {};
            for (i in eqns) {
                var series = eqns[i].variable;

                // Write the first iteration, which is just the initial value
                data[series] = [];
                data[series].push([params.t, params[series]]);
            }

            // Run the simulation `resolution` times per second for `time` seconds.
            // (It doesn't have to be seconds)
            for (var step = 1; step <= time * resolution; step++) {
                // Vars shouldn't contain deep objects, so use extend instead of copy.
                var newParams = angular.extend({}, params);

                // Update the time for this step (seconds).
                var t = step / resolution;
                params.t = t;

                // Convert each equation into a function with Angular's parser.
                for (i in eqns) {
                    var fn = $parse(eqns[i].expression);
                    var resultRate = fn(params, locals);
                    var result = params[eqns[i].variable] + resultRate / resolution;

                    // Write the new result to the variable list and the data series.
                    newParams[eqns[i].variable] = result;
                    data[eqns[i].variable].push([t, result]);
                }

                params = newParams;
            }

            return data;
        };

        return solver;
    });
})();