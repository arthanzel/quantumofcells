import { assert } from "chai";
import { describe, it, before } from "mocha"
import request from "superagent";

import prefix from "./util/prefix";

describe("QOC API Server", function() {
    it("should start", function(done) {
        request.get(prefix("/"))
            .then((res) => {
                assert.equal(res.body.message, "Quantum of Cells API Server");
                assert.equal(res.status, 200);
                done();
            });
    });

    it("should serve 404s", function(done) {
        request.get(prefix("/should-not-exist"))
            .catch((err) => {
                assert.equal(err.status, 404);
                assert.equal(err.response.body.error, "404 Not Found");
                done();
            });
    });

    it("should serve 500s", function(done) {
        request.get(prefix("/test-500"))
            .catch((err) => {
                assert.equal(err.status, 500);
                assert.equal(err.response.body.error, "500 Server Error");
                done();
            });
    });

    it("should serve 401s", function(done) {
        request.get(prefix("/protected"))
            .catch((err) => {
                assert.equal(err.status, 401);
                assert.equal(err.response.body.error, "401 Not Authorized");
                done();
            });
    });
});
