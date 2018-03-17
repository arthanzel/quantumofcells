import { assert } from "chai";
import async from "async";
import { describe, it, beforeEach, afterEach } from "mocha";
import request from "superagent";
import statusCodes from "http-status-codes"; // TODO: Put http-status-codes everywhere

import bootstrap from "./util/dbBootstrap";
import findAProject from "./util/findAProject";
import findAProjectFor from "./util/findAProjectFor";
import prefix from "./util/prefix";

import Project from "../src/model/Project";

const sampleEquations = [
    { symbol: "A", expression: "1" },
    { symbol: "B", expression: "2" }
];
const sampleParameters = [{ symbol: "c", expression: "3" }];
const sampleProject = {
    _id: 9,
    time: 9,
    resolution: 900,
    equations: sampleEquations,
    parameters: sampleParameters,
    name: "A New Project",
    shouldNotSave: 100
};

describe("Projects routes", function() {
    beforeEach(bootstrap.setup);
    afterEach(bootstrap.restore);

    // region List

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

    it("Should return 401 if listing projects and not logged in", function(done) {
        request.get(prefix("/projects"))
            .catch((err) => {
                assert.equal(err.status, 401);
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

    // endregion

    // region Fetch

    it("Should fetch projects", function(done) {
        findAProject((doc) => {
            request.get(prefix("/projects/" + doc._id))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
                .then((res) => {
                    const project = res.body.project;
                    assert.equal(res.status, statusCodes.OK);
                    assert.equal(project._id, doc._id);
                    assert.equal(project.name, doc.name);
                    assert.equal(project.equations.length, doc.equations.length);

                    done();
                });
        });
    });

    it("Should deny access to other users' projects", function(done) {
        findAProjectFor("another user", (doc) => {
            request.get(prefix("/projects/" + doc._id))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
                .catch((err) => {
                    assert.equal(err.status, statusCodes.NOT_FOUND);
                    const msg = err.response.body.error.message;
                    assert.equal(msg, `Can't find project with id '${ doc._id }'.`);
                    done();
                });
        });
    });

    it("Should throw a 404 if a project doesn't exist", function(done) {
        request.get(prefix("/projects/doesNotExist"))
            .set("Authorization", "Bearer " + ACCESS_TOKEN)
            .catch((err) => {
                assert.equal(err.status, statusCodes.NOT_FOUND);
                const msg = err.response.body.error.message;
                assert.equal(msg, `Can't find project with id 'doesNotExist'.`);
                done();
            });
    });

    // endregion

    // region Create

    it("Should create projects and persist only the name field", function(done) {
        const defaultProject = new Project();

        Project.count({ user: USER.sub }, (err, numDocsBefore) => {
            request.post(prefix("/projects"))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
                .send(sampleProject)
                .then((res) => {
                    const project = res.body.project;

                    assert.equal(res.status, statusCodes.CREATED);

                    assert.isString(project._id);
                    assert.equal(project.name, sampleProject.name);
                    assert.equal(project.time, defaultProject.time);
                    assert.equal(project.resolution, defaultProject.resolution);
                    assert.isEmpty(project.equations);
                    assert.isEmpty(project.parameters);

                    Project.count({ user: USER.sub }, (err, numDocsAfter) => {
                        assert.equal(numDocsAfter, numDocsBefore + 1);
                        done();
                    });
                });
        });
    });

    it("Should not allow creating projects with an empty name", function(done) {
        Project.count({ user: USER.sub }, (err, numDocsBefore) => {
            request.post(prefix("/projects"))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
                .send({ name: "" })
                .catch((err) => {
                    assert.equal(err.status, statusCodes.BAD_REQUEST);
                    const msg = err.response.body.error.message;
                    assert.equal(msg, "A project must have a name.");

                    Project.count({ user: USER.sub }, (err, numDocsAfter) => {
                        assert.equal(numDocsAfter, numDocsBefore);
                        done();
                    });
                });
        });
    });

    it("Should not allow creating projects with duplicate names", function(done) {
        Project.count({ user: USER.sub }, (err, numDocsBefore) => {
            request.post(prefix("/projects"))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
                .send({ name: "Harmonic Oscillator", time: 9, equations: { symbol: "v", expression: "x" } })
                .catch((err) => {
                    assert.equal(err.status, statusCodes.CONFLICT);
                    const msg = err.response.body.error.message;
                    assert.equal(msg, "A project with the name 'Harmonic Oscillator' already exists.");

                    Project.count({ user: USER.sub }, (err, numDocsAfter) => {
                        assert.equal(numDocsAfter, numDocsBefore);
                        done();
                    });
                });
        });
    });

    // endregion

    // region Update

    it("Should update projects and drop non-schema fields", function(done) {
        async.waterfall([
            (cb) => {
                // 1. Find a proper document
                findAProject((doc) => cb(null, doc));
            },
            (doc, cb) => {
                // 2. Send a PUT request
                request.put(prefix("/projects/" + doc._id))
                    .set("Authorization", "Bearer " + ACCESS_TOKEN)
                    .send(sampleProject)
                    .then((res) => cb(res.error, res, doc._id));
            },
            (res, _id, cb) => {
                // 3. Check the response and retrieve the document from the DB
                assert.equal(res.status, statusCodes.NO_CONTENT);
                Project.findOne({ user: USER.sub, _id: _id }, cb);
            },
            (doc, cb) => {
                // 4. Check that the document was persisted properly
                assert.notEqual(doc.name, sampleProject.name); // Name is immutable
                assert.equal(doc.time, sampleProject.time);
                assert.equal(doc.resolution, sampleProject.resolution);
                assert.equal(doc.equations.length, sampleEquations.length);
                assert.equal(doc.parameters.length, sampleParameters.length);
                assert.equal(doc.equations[0].symbol, sampleEquations[0].symbol);
                assert.equal(doc.parameters[0].symbol, sampleParameters[0].symbol);
                assert.isUndefined(doc.shouldNotSave);
                cb(null);
            }
        ], done);
    });

    it("Should throw a 404 if updating a missing project", function(done) {
        request.put(prefix("/projects/doesNotExist"))
            .set("Authorization", "Bearer " + ACCESS_TOKEN)
            .send(sampleProject)
            .catch((err) => {
                assert.equal(err.status, statusCodes.NOT_FOUND);
                done();
            });
    });

    it("Should deny updating other users' projects", function(done) {
        findAProjectFor("another user", (doc) => {
            request.put(prefix("/projects/" + doc._id))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
                .send(sampleProject)
                .catch((err) => {
                    assert.equal(err.status, statusCodes.NOT_FOUND);
                    done();
                });
        });
    });

    // endregion

    // region Delete

    it("Should remove projects", function(done) {
        Project.count({ user: USER.sub }, (err, numProjects) => {
            findAProject((doc) => {
                request.delete(prefix("/projects/" + doc._id))
                    .set("Authorization", "Bearer " + ACCESS_TOKEN)
                    .then((res) => {
                        assert.equal(res.status, statusCodes.NO_CONTENT);
                        Project.count({ user: USER.sub }, (err, numProjects2) => {
                            assert.equal(numProjects2, numProjects - 1);
                            Project.findById(doc._id, (err, doc) => {
                                assert.isNull(err);
                                assert.isNull(doc);
                                done();
                            });
                        })
                    });
            });
        });
    });

    it("Should not remove another user's projects", function(done) {
        const user = "another user";
        Project.count({ user: user }, (err, numProjects) => {
            findAProjectFor(user, (doc) => {
                request.delete(prefix("/projects/" + doc._id))
                    .set("Authorization", "Bearer " + ACCESS_TOKEN)
                    .catch((res) => {
                        assert.equal(res.status, statusCodes.NOT_FOUND);
                        Project.count({ user }, (err, numProjects2) => {
                            assert.equal(numProjects2, numProjects);
                            done();
                        })
                    });
            });
        });
    });

    // endregion
});