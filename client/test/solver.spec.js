import { assert } from "chai";
import { describe, it } from "mocha"

import solver from "qoc/solver";

describe("QOC Solver", function() {
    xit("should solve differential equations", function() {
        let eqn = "4";
        let data = solver(eqn, { x: 0 }, 2, 100);
    });
});
