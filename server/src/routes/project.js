import express from "express";

import checkJwt from "../auth/checkJwt";

const router = express.Router();
export default router;

router.use(checkJwt);

router.get("/", (req, res) => {
    res.json("projects");
});

router.get("/:id", (req, res) => {
    res.json(req.params.id);
});