import { assert } from "chai";

import Project from "../../src/model/Project";

export default function findAProject(callback) {
    Project.findOne({ user: USER.sub }, (err, doc) => {
        assert.isNull(err);
        assert.isNotNull(doc);
        callback(doc);
    });
};