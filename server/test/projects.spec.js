import { assert } from "chai";
import { describe, it, before, after } from "mocha";
import request from "superagent";

import auth from "./util/auth";
import prefix from "./util/prefix";
import token from "./util/token";

describe("Projects routes", function() {
    //const jwt = token();

    it("Should list projects", function(done) {
        request.get(prefix("/projects"))
            .set("Authorization", "Bearer " + auth())
            .then((res) => {
                const projects = res.body.projects;
                assert.equal(projects.length, 3);
                assert.equal(projects[0].name, "Harmonic Oscillator");
                assert.equal(projects[0].equations.length, 2);
                assert.equal(projects[1].name, "Lotka-Volterra");
                assert.equal(projects[2].name, "Mixing Problem");
                done();
            });
    });
});