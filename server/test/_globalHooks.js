import dotenv from "dotenv";
import { before, after } from "mocha";

import app from "../src/app";

before(function(done) {
    dotenv.config({
        path: ".env.test"
    });
    app.start(done);
});

after (function(done) {
    app.stop(done);
});