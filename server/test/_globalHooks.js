import { assert } from "chai";
import dotenv from "dotenv";
import { describe, it, before, after } from "mocha";
import request from "superagent";

import app from "../src/app";
import auth from "./util/auth";
import token from "./util/token";
import prefix from "./util/prefix";

before(function(done) {
    dotenv.config({
        path: ".env.test"
    });
    auth(() => {
        global.USER = token();
        console.log("Authenticated user " + USER.sub);
        app.start(done);
    })
});

after (function(done) {
    app.stop(done);
});

describe("The test harness", function() {
    it("should access protected endpoints", function(done) {
        // Auth tokens have the format [header].[body].[checksum]
        assert.equal(auth().split(".").length, 3);

        request.get(prefix("/projects"))
            .set("Authorization", "Bearer " + auth())
            .then((res) => {
                assert.equal(res.status, 200);
                done();
            });
    });

    it("should decode JWTs", function() {
        const jwt = token();
        assert.equal(jwt.iss, process.env.AUTH_ISSUER);
        assert.equal(jwt.aud, process.env.AUTH_AUDIENCE);
    });
});