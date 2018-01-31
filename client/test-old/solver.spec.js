// TODO: Allow expressions in param values.

describe("The QOC Solver", function() {
    beforeEach(module("qoc-solver"));

    beforeEach(inject(function($injector) {
        this.solver = $injector.get("QOCSolver");
    }));

    it("solves a simple differential equation with low precision", function() {
        var eqn = { variable: "A", expression: "cos(t)" };
        var params = { A: 3 };
        var time = 10; // seconds
        var resolution = 100; // samples/second
        var result = this.solver.solve(eqn, params, time, resolution);

        assert.isObject(result);
        assert.isArray(result.A);

        // Assert with the actual solution with 5% precision.
        for (var i = 0; i < time * resolution; i++) {
            var solution = Math.sin(i / resolution) + 3;
            assert.withinPercent(result.A[i][1], solution, 5);
        }
    });

    it("solves a simple differential equation with high precision", function() {
        var eqn = { variable: "A", expression: "3 * cos(t)" };
        var params = { A: 5 };
        var time = 10; // seconds
        var resolution = 1000; // samples/second
        var result = this.solver.solve(eqn, params, time, resolution);

        assert.isObject(result);
        assert.isArray(result.A);

        // Assert with the actual solution with 0.1% precision.
        for (var i = 0; i < time * resolution; i++) {
            var solution = 3 * Math.sin(i / resolution) + 5;
            assert.withinPercent(result.A[i][1], solution, 0.1);
        }
    });

    it("has access to the whole JS Math object", function() {
        var eqn = { variable: "A", expression: "cos(t) * sin(x) * tan(t) * ceil(t) * PI * E * log10(t)" };
        var result = this.solver.solve(eqn, { A : 1 }, 1, 10);

        for (var i = 0; i < result.A.length; i++) {
            assert.isNumber(result.A[i][1]);
        }
    });

    it("solves two pure-time differential equations", function() {
        var eqns = [{ variable: "A", expression: "cos(t)" },
                    { variable: "B", expression: "pow(t, 2) + 5 * t + 2 / (t + 1)" }];
        var params = { A: 3, B: 0 };
        var time = 10; // seconds
        var resolution = 1000; // samples/second
        var result = this.solver.solve(eqns, params, time, resolution);

        // Assert with the actual solutions with 0.1% precision.
        for (var i = 0; i < time * resolution; i++) {
            solutionA = Math.sin(i / resolution) + 3;
            solutionB = 1/3 * Math.pow(i / resolution, 3) +
                        5/2 * Math.pow(i / resolution, 2) +
                        2   * Math.log(i / resolution + 1); // t is always positive, so no need for ln |t|

            assert.withinPercent(result.A[i][1], solutionA, 0.1);
            assert.withinPercent(result.B[i][1], solutionB, 0.1);
        }
    });

    it("solves a simple differential equation with precise values", function() {
        var eqns = "2 * x";
        var params = { x: 1 };
        var time = 1; // seconds
        var resolution = 100; // samples/second
        var result = this.solver.solve(eqns, params, time, resolution);

        // Construct the actual solution
        var solution = 1;
        for (var i = 0; i <= time * resolution; i++) {
            assert.aboutEqual(result.x[i][1], solution);
            solution += 2 * solution / resolution;
        }
    });
});