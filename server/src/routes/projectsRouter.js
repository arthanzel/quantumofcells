import express from "express";

import checkJwt from "../auth/checkJwt";
import checkOwnership from "../auth/checkOwnership";
import Project from "../model/Project";

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
            res.send(doc.toJSON());
        }
    });
});

router.put("/projects/:id", (req, res) => {
    res.json("update project");
});

router.delete("/projects/:id", (req, res) => {
    res.json("create project");
});
