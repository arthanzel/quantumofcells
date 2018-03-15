import { assert } from "chai";

import Project from "../../src/model/Project";

export default function findAProjectFor(user, callback) {
    Project.findOne({ user: user }, (err, doc) => {
        assert.isNull(err);
        assert.isNotNull(doc);
        callback(doc);
    });
};