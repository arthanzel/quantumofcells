import { assert } from "chai";
import { describe, it } from "mocha"

import evaluatex from "evaluatex/evaluatex";
import eqns from "../testEquations";

describe("Evaluatex", function() {
    it("should run equations", function() {
        let fn;

        fn = evaluatex(eqns.simpleAdditionWS);
        assert.equal(fn(), 4);

        fn = evaluatex(eqns.simpleAdditionWS);
        assert.equal(fn(), 4);

        fn = evaluatex(eqns.pythagoras);
        assert.equal(fn({ a: 3, b: 4, c: 5 }), 0);

        fn = evaluatex(eqns.quadratic);
        assert.equal(fn({ a: -1, b: 1, c: 2 }), -1);
        assert.equal(fn({ a: 1, b: -1, c: -2 }), 2);

        fn = evaluatex(eqns.complexMultiplication);
        assert.equal(fn({ a: 10, b: 5, c: 2 }), 2000);

        fn = evaluatex(eqns.trig);
        assert.equal(fn(), 1);

        fn = evaluatex(eqns.complete);
        assert.equal(fn({ a: 2, b: 3, c0: 4}), -10);
    });
});
