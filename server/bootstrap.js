/*
Boostrap code for QOC Server.

In production, the server loads pre-compiled sources in the build/directory.
In development, babel-register is used to load ES6 files on the fly.

This file is invoked by the Node interpreter, and so must be written in ES5.
 */

// Try to set environment variables
const configResult = require("dotenv").config();
if (configResult.error && process.env.NODE_ENV !== "production") {
    // Production won't have the .env file
    console.error("Couldn't set environment variables.");
    console.error(configResult.error);
}

// Start the server
if (process.env.NODE_ENV === "production") {
    console.log("Running in production");
    try {
        require("./build/server");
    }
    catch (e) {
        console.log("Can't find build/server.js!");
        console.log(e);
    }
}
else {
    console.log("Running in development mode");
    require("babel-register");
    require("./src/server");
}
