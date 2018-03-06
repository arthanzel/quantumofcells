import express from "express";

import checkJwt from "../auth/checkJwt";
import checkOwnership from "../auth/checkOwnership";
import Project from "../model/Project";
import whitelist from "../util/whitelist";

const router = express.Router();
export default router;

// Require login
router.use(checkJwt);

// REST API

router.get("/", (req, res) => {
    Project.find({ user: req.user.sub }).sort({ name: 1 }).lean().exec((err, docs) => {
        res.json({ projects: docs })
    });
});

router.get("/:id", (req, res) => {
    Project.findOne({ _id: req.params.id, user: req.user.sub }).lean().exec((err, doc) => {
        if (err || !doc) {
            res.status(404).send({ error: "Can't find project with id " + req.params.id })
        }
        else {
            res.json({ project: doc });
        }
    });
});

router.post("/", (req, res) => {
    Project.create({ name: req.body.name, user: req.user.sub }, (err, doc) => {
        if (err) {
            res.status(500).send({ error: "Error while creating project." });
            console.error(err);
        }
        else {
            res.status(201).send(doc.toJSON());
        }
    });
});

router.put("/:id", (req, res) => {
    const obj = whitelist(req.body, ["name", "equations", "parameters", "time", "resolution"]);
    Project.findOne({ _id: req.params.id, user: req.user.sub }, (err, doc) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        if (!doc) {
            res.sendStatus(404);
            return;
        }

        doc.set(obj);
        doc.save((err, updatedDoc) => {
            if (err) {
                res.send(500);
                return;
            }
            res.json({ project: updatedDoc.toJSON() });
        });
    });
});

router.delete("/:id", (req, res) => {
    res.json("create project");
});
