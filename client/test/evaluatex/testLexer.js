import { assert } from "chai";
import { describe, it } from "mocha"

import lexer from "evaluatex/Lexer";
import eqns from "../testEquations";

describe("Evaluatex Lexer", function() {
    it("should lex equations", function() {
        let str = lexer(eqns.simpleAdditionWS).toString();
        assert.equal(str, "TNUMBER[2] TPLUS TNUMBER[2]", "simpleAdditionWS not equal");

        str = lexer(eqns.simpleAddition).toString();
        assert.equal(str, "TNUMBER[2] TPLUS TNUMBER[2]", "simpleAddition not equal");

        str = lexer(eqns.pythagoras).toString();
        assert.equal(str, "TSYMBOL[a] TPOWER TNUMBER[2] TPLUS TSYMBOL[b] TPOWER TNUMBER[2] TMINUS TSYMBOL[c] TPOWER TNUMBER[2]", "pythagoras not equal");

        str = lexer(eqns.quadratic).toString();
        assert.equal(str, "TLPAREN[(] TMINUS TSYMBOL[b] TPLUS TSYMBOL[sqrt] TLPAREN[(] TSYMBOL[b] TPOWER TNUMBER[2] TMINUS TNUMBER[4] TTIMES TSYMBOL[a] TTIMES TSYMBOL[c] TRPAREN[)] TRPAREN[)] TDIVIDE TLPAREN[(] TNUMBER[2] TTIMES TSYMBOL[a] TRPAREN[)]", "quadratic not equal");

        str = lexer(eqns.complexMultiplication).toString();
        assert.equal(str, "TNUMBER[20] TSYMBOL[a] TSYMBOL[b] TTIMES TSYMBOL[c]", "complexMultiplication not equal");

        str = lexer(eqns.trig).toString();
        assert.equal(str, "TSYMBOL[sin] TLPAREN[(] TNUMBER[0.5] TRPAREN[)] TPOWER TNUMBER[2] TPLUS TSYMBOL[cos] TLPAREN[(] TMINUS TNUMBER[0.5] TRPAREN[)] TPOWER TNUMBER[2]", "trig not equal");

        str = lexer(eqns.complete).toString();
        assert.equal(str, "TNUMBER[4] TLPAREN[(] TSYMBOL[a] TPLUS TSYMBOL[b] TRPAREN[)] TLPAREN[(] TSYMBOL[a] TMINUS TSYMBOL[b] TRPAREN[)] TSYMBOL[a] TPOWER TSYMBOL[a] TTIMES TSYMBOL[b] TDIVIDE TABS TMINUS TSYMBOL[c0] TABS TBANG", "complete not equal");
    });
});
