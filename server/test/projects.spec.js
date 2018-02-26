import { assert } from "chai";
import { describe, it, before, after } from "mocha";
import async from "async";
import request from "superagent";

import auth from "./util/auth";
import bootstrap from "./util/bootstrap";
import prefix from "./util/prefix";

import Project from "../src/model/Project";

describe("Projects routes", function() {
    beforeEach(bootstrap.setup);
    afterEach(bootstrap.restore);

    it("Should list projects", function(done) {
        request.get(prefix("/projects"))
            .set("Authorization", "Bearer " + auth())
            .then((res) => {
                const projects = res.body.projects;
                assert.equal(res.status, 200);
                assert.equal(projects.length, 3);
                assert.equal(projects[0].name, "Harmonic Oscillator");
                assert.equal(projects[0].equations.length, 2);
                assert.equal(projects[1].name, "Lotka-Volterra");
                assert.equal(projects[2].name, "Mixing Problem");
                for (const project of projects) {
                    assert.isString(project._id);
                }
                done();
            });
    });

    it("Should create projects", function(done) {
        request.post(prefix("/projects"))
            .set("Authorization", "Bearer " + auth())
            .send({ name: "A New Project" })
            .then((res) => {
                assert.equal(res.status, 200);
                assert.isString(res.body._id);
                assert.equal(res.body.name, "A New Project");
                assert.equal(res.body.time, 1);         // Default time
                assert.equal(res.body.resolution, 100); // Default resolution
                Project.find((err, docs) => {
                    assert.equal(docs.length, 4);
                    done();
                });
            });
    });
});