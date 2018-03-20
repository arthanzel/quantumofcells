import express from "express";
import * as statusCodes from "http-status-codes";

import checkJwt from "../auth/checkJwt";
import Project from "../model/Project";
import whitelist from "../util/whitelist";

const router = express.Router();
export default router;

// Require login
router.use(checkJwt);

// REST API

router.get("/", (req, res) => {
    Project.find({ user: req.user.sub }).sort({ name: 1 }).lean().exec((err, docs) => {
        res.json({ projects: docs });
    });
});

router.get("/:id", (req, res) => {
    Project.findOne({ _id: req.params.id, user: req.user.sub }).lean().exec((err, doc) => {
        if (err || !doc) {
            res.status(statusCodes.NOT_FOUND)
                .json({ error: { message: `Can't find project with id '${ req.params.id }'.` } });
        }
        else {
            res.json({ project: doc });
        }
    });
});

router.post("/", (req, res) => {
    Project.create({ name: req.body.name, user: req.user.sub }, (err, doc) => {
        if (err) {
            if (err.code === 11000) {
                // Duplicate key error
                const msg = `A project with the name '${ req.body.name }' already exists.`;
                res.status(statusCodes.CONFLICT)
                    .json({ error: { status: statusCodes.CONFLICT, message: msg } });
                return;
            }
            if (err.name === "ValidationError") {
                // Didn't provide a name
                const msg = "A project must have a name.";
                res.status(statusCodes.BAD_REQUEST)
                    .json({ error: { status: statusCodes.BAD_REQUEST, message: msg } });
                return;
            }

            res.status(statusCodes.INTERNAL_SERVER_ERROR).send({ error: "Error while creating project." });
            console.error(err);
        }
        else {
            res.status(statusCodes.CREATED).send({ project: doc.toJSON() });
        }
    });
});

router.put("/:id", (req, res) => {
    const obj = whitelist(req.body, ["equations", "parameters", "time", "resolution"]);

    // Sanitize equations and parameters
    obj.equations = obj.equations.map((eqn) => {
        return whitelist(eqn, ["expression", "symbol"]);
    });
    obj.parameters = obj.parameters.map((param) => {
        return whitelist(param, ["expression", "symbol"]);
    });

    // TODO: Collapse to findOneAndUpdate?
    Project.findOne({ _id: req.params.id, user: req.user.sub }, (err, doc) => {
        if (err) {
            res.sendStatus(statusCodes.INTERNAL_SERVER_ERROR);
            return;
        }
        if (!doc) {
            res.sendStatus(statusCodes.NOT_FOUND);
            return;
        }

        doc.set(obj);
        doc.save((err, updatedDoc) => {
            if (err) {
                console.error(err);
                res.sendStatus(statusCodes.INTERNAL_SERVER_ERROR);
                return;
            }
            res.sendStatus(statusCodes.NO_CONTENT);
        });
    });
});

router.delete("/:id", (req, res) => {
    Project.findOneAndRemove({ _id: req.params.id, user: req.user.sub }, (err, doc) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        if (!doc) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    });
});
