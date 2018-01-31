import merge from "evaluatex/util/propertyMerge";

import { describe, it } from "mocha";
import { assert } from "chai";

describe("Evaluatex property merge", function() {
    it("should merge objects", function() {
        let obj = { a: 2, b: 3, cos: 4 };
        let obj2 = { c: 5, b: 6 };
        let target = merge(obj, obj2, Math);
        assert.equal(target.a, 2, "key a");
        assert.equal(target.b, 6, "key b");
        assert.equal(target.c, 5, "key c");
        assert.equal(target.cos, Math.cos, "key cos");
    });
});