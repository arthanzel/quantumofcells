/*
Boostrap code for QOC Server.

In production, the server loads pre-compiled sources in the build/directory.
In development, babel-register is used to load ES6 files on the fly.

This file is invoked by the Node interpreter, and so must be written in ES5.
 */

if (process.env.NODE_ENV === "production") {
    require("./build/server");
}
else {
    console.log("Quantum of Cells API running in development mode");
    require("babel-register");
    require("./src/server");
}
