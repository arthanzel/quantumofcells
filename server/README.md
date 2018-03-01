Quantum of Cells API Server
===========================

Developing
----------

### Building
Make sure that `NODE_ENV` is not `production`.

    npm install
    cp .env.defaults .env
    cp .env.test.defaults .env.test
    
You'll need to set up a database to launch the server and run tests. Look at the **Database** section below.

`npm test` runs server tests.
    
`npm start` runs a development server on whichever port is specified in the `.env` file.

If you want changes to take effect without a restart, run `npm run monitor` instead of `npm start`.

### Internet Connection Required
The server requires an active internet connection to validate requests through Auth0's API. If the internet is unavailable, requests that access privileged resources may fail.

The server 

### Database
Quantum of Cells uses [MongoDB](https://www.mongodb.com/) to store data. You can use either a local instance, or connect to a service such as [mLab](https://mlab.com/).

#### Local Database
By default, the server will try to connect to a database on `localhost:27017` (the default port) with no user or password. If you need to tweak these settings, do so in the `.env` and `.env.test` files.

If you have docker, get a database up and running quickly with:

    docker run -p 127.0.0.1:27017:27017 -d mongo
    
#### Remote Database
To connect to a remote database, change the `DB_URI`, `DB_USER`, and `DB_PASSWORD` in `.env` and `.env.test`. If you're using mLab, the format for `DB_URI` is `ab12345.mlab.com:port/database-name`.

**Note**: Some services (like mLab) use non-standard ports, which are blocked on some organizations' networks (like uOttawa's). Therefore, you'll need to run a VPN or simply use a local database.

### Production
The Quantum of Cells API server is written in ES6. Node doesn't support some ES6 features, so the sources must be transpiled for them to work.

The entry point of the server is in `bootstrap.js`. In development, the source files in `src/` are interpreted directly by Babel. In production, `bootstrap.js` reads transpiled code from the `build/` directory. To prepare this app for production, run:

    npm run build
    NODE_ENV=production npm start
    
### IntelliJ IDEA Setup

#### Run/Debug Configurations
