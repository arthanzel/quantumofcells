import async from "async";
import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import request from "superagent";

import checkJwt from "./auth/checkJwt";
import projectsRouter from "./routes/projectsRouter";

const app = express();
export default app;
let server;

/**
 * Starts the API server.
 * @param done Function called once the server has started and is listening to connections.
 */
app.start = function(done) {
    // Connect to database
    if (process.env.DEBUG) {
        mongoose.set("debug", true);
    }
    const dbUri = `mongodb://${ config.get("db.host") }:${ config.get("db.port") }/${ config.get("db.name") }`;
    mongoose.connect(dbUri, {
        user: config.get("db.user"),
        pass: config.get("db.password")
    }).then(() => {
        console.log("Connected to database");
    }, (err) => {
        console.error(`Error connecting to database`);
        console.error(err);
    });

    setupPaths();

    server = app.listen(config.get("port"), () => {
        console.log(`Listening on ${ config.get("port") }`);
        if (typeof done === "function") {
            done();
        }
    });

    // Keep the Heroku app alive
    if (config.keepAlive) {
        setInterval(() => { request.get(config.keepAlive).then(() => {}) }, 60 * 1000);
    }
};

/**
 * Stops the API server.
 * @param done Function called once the server has stopped.
 */
app.stop = function(done) {
    // The binding is necessary, otherwise `this` is undefined.
    async.series([
        server.close.bind(server),
        mongoose.disconnect.bind(mongoose)
    ], () => {
        if (typeof done === "function") {
            console.log("Server stopped");
            done();
        }
    })
};

function setupPaths() {
    app.use(bodyParser.json());
    app.use(cors({
        origin: config.get("corsOrigin")
    }));

    app.get("/", (req, res) => {
        res.json({ message: "Quantum of Cells API Server" });
    });
    app.get("/protected", checkJwt, (req, res) => {
        res.json({ message: "Protected Endpoint" })
    });

    app.use("/projects", projectsRouter);

    // Error handlers
    app.get("/test-500", (req, res) => {
        throw "Testing 500 handler. This error is deliberate.";
    });
    app.use((req, res) => {
        res.status(404).json({ error: "404 Not Found" });
    });
    app.use((err, req, res, next) => {
        switch (err.status) {
            case 401:
                res.status(401).json({ error: "401 Not Authorized" });
                break;
            default:
                console.error(err);
                res.status(500).json({ error: "500 Server Error" });
                break;
        }
    });
}