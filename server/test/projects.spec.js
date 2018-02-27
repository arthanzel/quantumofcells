import { assert } from "chai";
import async from "async";
import { describe, it, beforeEach, afterEach } from "mocha";
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

    it("Should create projects and drop non-schema fields", function(done) {
        request.post(prefix("/projects"))
            .set("Authorization", "Bearer " + auth())
            .send({ name: "A New Project", time: 9, equations: { symbol: "v", expression: "x" } })
            .then((res) => {
                assert.equal(res.status, 200);
                assert.isString(res.body._id);
                assert.equal(res.body.name, "A New Project");
                assert.equal(res.body.time, 1);         // Default time
                assert.equal(res.body.resolution, 100); // Default resolution
                assert.equal(res.body.equations.length, 0);
                Project.find({ user: USER.sub }, (err, docs) => {
                    assert.equal(docs.length, 4);
                    done();
                });
            });
    });

    it("Should fetch projects", function(done) {
        Project.findOne({ user: USER.sub }, (err, doc) => {
            assert.isNull(err);
            assert.isNotNull(doc);
            request.get(prefix("/projects/" + doc._id))
                .set("Authorization", "Bearer " + auth())
                .then((res) => {
                    const project = res.body.project;
                    assert.equal(res.status, 200);
                    assert.equal(project._id, doc._id);
                    assert.equal(project.name, doc.name);
                    assert.equal(project.equations.length, 2);

                    done();
                });
        });
    });

    it("Should deny access to other users' projects", function(done) {
        Project.findOne({ user: "another user" }, (err, doc) => {
            assert.isNull(err);
            assert.isNotNull(doc);
            request.get(prefix("/projects/" + doc._id))
                .set("Authorization", "Bearer " + auth())
                .catch((err) => {
                    assert.equal(err.status, 404);
                    done();
                });
        });
    });

    it("Should throw a 404 if a project doesn't exist", function(done) {
        request.get(prefix("/projects/doesNotExist"))
            .set("Authorization", "Bearer " + auth())
            .catch((err) => {
                assert.equal(err.status, 404);
                done();
            });
    });
});