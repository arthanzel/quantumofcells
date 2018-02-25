Quantum of Cells SPA Client
===========================

Building
--------
Make sure that `NODE_ENV` is not `production`.

    npm install
    cp .env.defaults .env
    npm start
    
This runs a development server at `http://lvh.me:8080`. Running this development server is necessary for authentication to work.
    
IntelliJ IDEA Setup
-------------------

### Run/Debug Configurations

#### Client Test
- Type: Mocha
- Working Directory: `client`
- Extra Mocha options: `--require babel-register`
- Test directory: `test`
- Include subdirectories: Checked

#### Client Start

- Type: npm
- Package.json: `client/package.json`
- Command: `start`


### File Hierarchy
