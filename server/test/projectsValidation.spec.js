import _ from "lodash";
import times from "async/times";
import cuid from "cuid";
import { assert } from "chai";
import * as httpStatus from "http-status-codes";
import { describe, it, beforeEach, afterEach } from "mocha";
import request from "superagent";

import dbBootstrap from "./util/dbBootstrap";

import Equation from "../src/model/Equation";
import Project from "../src/model/Project";
import prefix from "./util/prefix";

describe("Projects validators", function() {
    beforeEach(dbBootstrap.setup);

    it("should not save project with an empty name", function(done) {
        const project = createProject();
        project.name = "";
        project.save((err, doc) => {
            assert.isNotNull(err);
            done();
        });
    });

    it("should not save project with a long name", function(done) {
        const project = createProject();
        project.name = _.repeat("a", 101);
        project.save((err, doc) => {
            assert.isNotNull(err);
            done();
        });
    });

    it("should not save project with too many equations", function(done) {
        const project = createProject();
        project.equations = _.times(11, createEquation);
        project.save((err, doc) => {
            assert.isNotNull(err);
            done();
        });
    });

    it("should not save project with too many parameters", function(done) {
        const project = createProject();
        project.parameters = _.times(31, createEquation);
        project.save((err, doc) => {
            assert.isNotNull(err);
            done();
        });
    });

    it("should not save more than 100 projects per user", function(done) {
        const projects = _.times(100, () => createProject(cuid(), USER.sub));
        Project.insertMany(projects, (err, docs) => {
            assert.isNull(err);
            assert.equal(docs.length, 100);
            request.post(prefix("/projects"))
                .set("Authorization", "Bearer " + ACCESS_TOKEN)
                .send({ name: cuid() })
                .then(res => {
                    assert.fail();
                })
                .catch(err => {
                    assert.equal(err.status, httpStatus.FORBIDDEN);
                    done();
                });
        });
    });

    it("should not save equations with long symbols", function(done) {
        const project = createProject();
        const eqn = createEquation();
        eqn.symbol = _.repeat("a", 11);
        project.equations = [eqn];
        project.save((err, doc) => {
            assert.isNotNull(err);
            done();
        });
    });

    it("should not save equations with long expressions", function(done) {
        const project = createProject();
        const eqn = createEquation();
        eqn.expression = _.repeat("a", 501);
        project.equations = [eqn];
        project.save((err, doc) => {
            assert.isNotNull(err);
            done();
        });
    });
});

function createProject(name = "Project", user = "some user") {
    return new Project({ name: name, user: user });
}

function createEquation() {
    return new Equation({ symbol: "A", expression: "1" });
}
