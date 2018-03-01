Quantum of Cells API Server
===========================

Building
--------
Make sure that `NODE_ENV` is not `production`.

    npm install
    cp .env.defaults .env
    cp .env.test.defaults .env.test
    
You'll  need to have an instance of [MongoDB](https://www.mongodb.com/) running locally, on the default port, with no authentication.
To use different settings, or to use a remote database such as [mLab](https://mlab.com/), tweak the variables in `.env`.

`npm test` runs server tests.
    
`npm start` runs a development server on whichever port is specified in the `.env` file.

If you want changes to take effect without a restart, run `npm run monitor` instead of `npm start`.

Production
----------
The Quantum of Cells API server is written in ES6. Node doesn't support some ES6 features, so the sources must be transpiled for them to work.

The entry point of the server is in `bootstrap.js`. In development, the source files in `src/` are interpreted directly by Babel. In production, `bootstrap.js` reads transpiled code from the `build/` directory. To prepare this app for production, run:

    npm run build
    NODE_ENV=production npm start
    
IntelliJ IDEA Setup
-------------------

### Run/Debug Configurations
