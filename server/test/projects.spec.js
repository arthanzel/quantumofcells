import { assert } from "chai";
import async from "async";
import { describe, it, beforeEach, afterEach } from "mocha";
import request from "superagent";

import bootstrap from "./util/dbBootstrap";
import findAProject from "./util/findAProject";
import findAProjectFor from "./util/findAProjectFor";
import prefix from "./util/prefix";

import Project from "../src/model/Project";

const newEquations = [
    { symbol: "A", expression: "1" },
    { symbol: "B", expression: "2" }
];
const newParameters = [{ symbol: "c", expression: "3" }];

describe("Projects routes", function() {
    beforeEach(bootstrap.setup);
    afterEach(bootstrap.restore);

    it("Should list projects", function(done) {
        request.get(prefix("/projects"))
            .set("Authorization", "Bearer " + ACCESS_TOKEN)
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

    it("Should return an empty list if there are no projects", function(done) {
        Project.remove({ user: USER.sub }, function(err) {
            assert.isNull(err);
            request.get(prefix("/projects"))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
                .then((res) => {
                    assert.isArray(res.body.projects);
                    assert.isEmpty(res.body.projects);
                    done();
                });
        });
    });

    it("Should create projects and drop non-schema fields", function(done) {
        request.post(prefix("/projects"))
            .set("Authorization", "Bearer " + ACCESS_TOKEN)
            .send({ name: "A New Project", time: 9, equations: { symbol: "v", expression: "x" } })
            .then((res) => {
                assert.equal(res.status, 201);
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
        findAProject((doc) => {
            request.get(prefix("/projects/" + doc._id))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
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
        findAProjectFor("another user", (doc) => {
            request.get(prefix("/projects/" + doc._id))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
                .catch((err) => {
                    assert.equal(err.status, 404);
                    done();
                });
        });
    });

    it("Should throw a 404 if a project doesn't exist", function(done) {
        request.get(prefix("/projects/doesNotExist"))
            .set("Authorization", "Bearer " + ACCESS_TOKEN)
            .catch((err) => {
                assert.equal(err.status, 404);
                done();
            });
    });

    it("Should throw a 404 if updating a missing project", function(done) {
        request.put(prefix("/projects/doesNotExist"))
            .set("Authorization", "Bearer " + ACCESS_TOKEN)
            .send({ time: 9, resolution: 9, equations: newEquations, parameters: newParameters })
            .catch((err) => {
                assert.equal(err.status, 404);
                done();
            });
    });

    it("Should deny updating other users' projects", function(done) {
        findAProjectFor("another user", (doc) => {
            request.put(prefix("/projects/" + doc._id))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
                .send({ time: 9, resolution: 9, equations: newEquations, parameters: newParameters })
                .catch((err) => {
                    assert.equal(err.status, 404);
                    done();
                });
        });
    });

    it("Should update projects", function(done) {
        const newParams = {
            time: 9,
            resolution: 9,
            equations: newEquations,
            parameters: newParameters,
            name: "New Name",
            shouldNotSave: 100
        };

        async.waterfall([
            (cb) => {
                // 1. Find a proper document
                findAProject((doc) => cb(null, doc));
            },
            (doc, cb) => {
                // 2. Send a PUT request
                request.put(prefix("/projects/" + doc._id))
                    .set("Authorization", "Bearer " + ACCESS_TOKEN)
                    .send(newParams)
                    .then((res) => cb(null, res));
            },
            (res, cb) => {
                // 3. Check the response and retrieve the document from the DB
                const project = res.body.project;
                assert.equal(res.status, 200);
                assert.equal(project.name, newParams.name);
                assert.equal(project.time, newParams.time);
                assert.equal(project.resolution, newParams.resolution);
                assert.equal(project.equations.length, 2);
                assert.equal(project.parameters.length, 1);
                assert.equal(project.equations[0].symbol, "A");
                assert.equal(project.parameters[0].symbol, "c");
                assert.isUndefined(project.shouldNotSave);


                Project.findOne({ user: USER.sub, _id: project._id }, cb);
            },
            (doc, cb) => {
                // 4. Check that the document was persisted properly
                assert.equal(doc.name, newParams.name);
                assert.equal(doc.time, newParams.time);
                assert.equal(doc.resolution, newParams.resolution);
                assert.equal(doc.equations.length, 2);
                assert.equal(doc.parameters.length, 1);
                assert.equal(doc.equations[0].symbol, "A");
                assert.equal(doc.parameters[0].symbol, "c");
                assert.isUndefined(doc.shouldNotSave);
                cb(null);
            }
        ], done);
    });

    xit("should remove projects", function(done) {
        findAProject((doc) => {
            request.delete(prefix("/projects/" + doc._id));
        });
    });
});