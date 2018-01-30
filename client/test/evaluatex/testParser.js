import { assert } from "chai";
import { describe, it } from "mocha"

import lexer from "evaluatex/Lexer";
import parser from "evaluatex/Parser";
import eqns from "../testEquations";

describe("Evaluatex Parser", function() {
    it("should parse equations", function() {
        let tokens, ast;

        tokens = lexer(eqns.simpleAdditionWS);
        ast = parser(tokens);
        assert.equal(ast.nodeCount, 3, "simpleAdditionWS");

        tokens = lexer(eqns.simpleAddition);
        ast = parser(tokens);
        assert.equal(ast.nodeCount, 3, "simpleAddition");

        tokens = lexer(eqns.pythagoras);
        ast = parser(tokens);
        assert.equal(ast.nodeCount, 11, "pythagoras");

        tokens = lexer(eqns.quadratic);
        ast = parser(tokens);
        assert.equal(ast.nodeCount, 18, "quadratic");

        tokens = lexer(eqns.complexMultiplication);
        ast = parser(tokens);
        assert.equal(ast.nodeCount, 5, "complexMultiplication");

        tokens = lexer(eqns.trig);
        ast = parser(tokens);
        assert.equal(ast.nodeCount, 10, "trig");

        tokens = lexer(eqns.complete);
        ast = parser(tokens);
        assert.equal(ast.nodeCount, 18, "complete");
    });
});
