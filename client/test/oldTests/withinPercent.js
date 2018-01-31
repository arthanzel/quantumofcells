/**
 * withinPercent.js
 *
 * This file adds a withinPercent that checks whether a number is within a certain percentage of another number.
 * This assertion basically delegates to aboutEqual (./aboutEqual.js).
 */

chai.use(function(_chai, utils) {
    _chai.Assertion.addMethod("withinPercent", function(other, percent) {
        p_str = "" + percent + "%"

        this.assert(
            this._obj.should.be.aboutEqual(other, other * percent / 100),
            "expected #{this} to be within " + p_str + " of #{exp}",
            "expected #{this} not to be within " + p_str + " of #{exp}",
            other
        );
    });

    _chai.assert.withinPercent = function(a, b, p) { a.should.be.withinPercent(b, p); };
});

// ====== Assertion test ======

describe("The withinPercent assertion", function() {
    it("works for numbers", function() {
        assert.withinPercent(0.95, 1, 5);
        expect(0.95).to.be.withinPercent(1, 5);
        (0.95).should.withinPercent(1, 5);
    });
});