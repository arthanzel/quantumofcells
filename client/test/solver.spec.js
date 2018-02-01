import { assert } from "chai";
import { describe, it } from "mocha"

import solver from "solver";

describe("QOC Solver", function() {
    it("should solve differential equations", function() {
        let eqn = "4";
        let data = solver(eqn, { x: 0 }, 2, 100);
        for (let i of data.data["0"]) {
            //console.log(i);
        }
    });
});
