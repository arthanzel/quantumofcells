Quantum of Cells SPA Client
===========================
    
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
