import express from "express";

import checkJwt from "../auth/checkJwt";
import checkOwnership from "../auth/checkOwnership";
import Project from "../model/Project";

const router = express.Router();
export default router;

router.use(checkJwt);

router.get("/", (req, res) => {
    Project.find({ user: req.user.sub }).lean().exec((err, docs) => {
        res.json({ projects: docs })
    });
});

router.get("/:id", checkOwnership(Project), (req, res) => {
    res.json("show project");
});

router.post("/", (req, res) => {
    res.json("create project");
});

router.put("/projects/:id", (req, res) => {
    res.json("update project");
});

router.delete("/projects/:id", (req, res) => {
    res.json("create project");
});
