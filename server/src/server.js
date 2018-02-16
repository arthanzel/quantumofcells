import express from "express";

const app = express();
const PORT = process.env.PORT || 8081;

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.listen(PORT);
console.log("Quantum of Cells API listening on 8081");