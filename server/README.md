Quantum of Cells API Server
===========================

Developing
----------

### Production
The Quantum of Cells API server is written in ES6. Node doesn't support some ES6 features, so the sources must be transpiled for them to work.

The entry point of the server is in `bootstrap.js`. In development, the source files in `src/` are interpreted directly by Babel. In production, `bootstrap.js` reads transpiled code from the `build/` directory. To prepare this app for production, run:

    npm run build
    NODE_ENV=production npm start
    
### IntelliJ IDEA Setup

#### Run/Debug Configurations
