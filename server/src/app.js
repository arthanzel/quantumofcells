import async from "async";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import projectsRouter from "./routes/projectsRouter";

const app = express();
export default app;
let server;

app.start = function(done) {
    // Connect to database
    if (process.env.NODE_ENV !== "production") {
        mongoose.set("debug", true);
    }
    mongoose.connect(`mongodb://${ process.env.DB_URI }`, {
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD
    }).then(() => {
        console.log("Connected to database");
    }, (err) => {
        console.error(`Error connecting to database ${ process.env.DB_URI }`);
        console.error(err);
    });

    //setupPaths();

    if (process.env.PORT === undefined) {
        process.env.PORT = "5000";
        console.warn("PORT not specified. Defaulting to 5000.");
    }

    setupPaths();

    server = app.listen(process.env.PORT, done);
    console.log(`Listening on ${process.env.PORT}`);
};

app.stop = function(done) {
    // The binding is necessary, otherwise `this` is undefined.
    async.series([
        server.close.bind(server),
        mongoose.disconnect.bind(mongoose)
    ], () => {
        console.log("Server stopped");
        done();
    })
};

function setupPaths() {
    app.use(cors({
        origin: process.env.CORS_ORIGIN
    }));

    app.get("/", (req, res) => {
        res.json({ message: "Quantum of Cells API Server" });
    });

    app.use("/projects", projectsRouter);

    // Error handlers
    app.get("/test-500", (req, res) => {
        throw "Test error";
    });
    app.use((req, res, next) => {
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