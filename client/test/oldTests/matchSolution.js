/**
 * matchSolution.js
 *
 * This file adds a matchSolution assertion that checks if an array of points
 * matches a known solution to a differential equation. The known solution may
 * be provided as either a string or a function. The variable "t" will be
 * substituted for the time.
 */

chai.use(function(_chai, utils) {
    _chai.Assertion.addMethod("matchSolution", function(soln, time, resolution) {

        // If the solution is provided as a string, turn it into a function that
        // `eval`s the string given a time `t`.
        var solnString = soln;
        if (typeof soln === "string") {
            soln = function(t) {
                return eval(solnString);
            }
        }

        // Compare given results with the solution.
        var result = { valid: true };
        for (var i = 0; i < time * resolution; i++) {
            var t = i / resolution;
            var exp = soln(t);
            var act = this._obj[i][1];

            try {
                assert.aboutEqual(t, this._obj[i][0]);  // Compare time.
                assert.aboutEqual(exp, act);            // Compare value.
            }
            catch (e) {
                result = { valid: false, time: t, exp: exp, act: act };
                break;
            }
        }

        var message = solnString    +
                      ". At t="     +
                      result.time   +
                      ", expected "  +
                      result.exp    +
                      " but got "    +
                      result.act    +
                      ".";

        this.assert(
            result.valid,
            "expected a solution to " + message,
            "did not expect a solution to " + solnString + ", but got one."
        );
    });

    _chai.assert.matchesSolution = function(a, b, c, d) { a.should.matchSolution(b, c, d); };
});

// ====== Assertion test ======

describe("The matchSolution assertion", function() {
    it("works for a simple differential equation", function() {
        var solution = [];
        for (var t = 0; t < 5; t += 0.25) { // 4 samples/s for 5 s
            solution.push([t, Math.sin(t) + 1])
        }

        solution.should.matchSolution("Math.sin(t) + 1", 5, 4);
        solution.should.not.matchSolution("Math.sin(t) + 0", 5, 4);
    });
});