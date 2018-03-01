Quantum of Cells SPA Client
===========================

Developing
----------

### Building
Make sure that `NODE_ENV` is not `production`.

    npm install
    cp .env.defaults .env
    npm start
    
This runs a development server at `http://lvh.me:8080`. Running this development server is necessary for authentication to work.

### Internet Connection Required
Auth0 places restrictions on clients logging in from `localhost`. To avoid these, `npm start` serves the client from the domain `lvh.me`, which resolves to `127.0.0.1`. The API server and Auth0 are also configured to accept requests only from this domain. If this is a problem, edit your `hosts` file to point the `lvh.me` domain to `127.0.0.1`. Do note that other parts of the app, such as the API server and Auth0 require an active internet connection.
    
### IntelliJ IDEA Setup

#### Run/Debug Configurations

##### Client Test
- Type: Mocha
- Working Directory: `client`
- Extra Mocha options: `--require babel-register`
- Test directory: `test`
- Include subdirectories: Checked

##### Client Start

- Type: npm
- Package.json: `client/package.json`
- Command: `start`

#### File Hierarchy
In the `Project` pane, click on the gear icon in the top-right and select `File Nesting`. Add an entry for `.js -> .styl`. This places stylesheets as children of their respective components inside the project browser and makes things a little bit neater.
