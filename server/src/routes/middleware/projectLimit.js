import * as httpStatus from "http-status-codes";

import Project from "../../model/Project";

const MAX_PROJECTS_PER_USER = 100;

/**
 * Express middleware that throws an error if the current user has 100 or more projects.
 * This is used as a middleware when creating projects to enforce a maximum project count.
 */
export default function projectLimit(req, res, next) {
    if (!req.user) {
        next();
    }

    Project.count({ user: req.user.sub }, (err, count) => {
        if (count < MAX_PROJECTS_PER_USER) {
            next();
        }
        else {
            res.status(httpStatus.FORBIDDEN);
            res.json({ error: { status: httpStatus.FORBIDDEN, message: "Can't have more than 100 projects." } });
        }
    });
};