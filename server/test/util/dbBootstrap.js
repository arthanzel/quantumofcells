import Project from "../../src/model/Project";
import Equation from "../../src/model/Equation";

/**
 * Functions for setting up and tearing down test data in the database.
 */
const bootstrap = {};
export default bootstrap;

/**
 * Inserts some test data into the database.
 * This function should be called before each test case.
 * @param done Callback for when the operation completes.
 */
bootstrap.setup = function bootstrapSetup(done) {
    // Remove any stray artifacts e.g. from aborted tests
    bootstrap.restore(() => {
        doSetup(done);
    });
};

// TODO: Take projects from the sample project list?
function doSetup(done) {
    const projectsToAdd = [];
    projectsToAdd.push(new Project({
        name: "Harmonic Oscillator",
        user: USER.sub,
        equations: [
            new Equation({ symbol: "F", expression: "-k*X" }),
            new Equation({ symbol: "X", expression: "F" })
        ],
        parameters: [
            new Equation({ symbol: "F", expression: "0" }),
            new Equation({ symbol: "X", expression: "-1" }),
            new Equation({ symbol: "k", expression: "1" })
        ]
    }));
    projectsToAdd.push(new Project({
        name: "Lotka-Volterra",
        user: USER.sub,
        equations: [
            new Equation({ symbol: "X", expression: "a*X - b*X*Y" }),
            new Equation({ symbol: "Y", expression: "c*X*Y - d*Y" })
        ],
        parameters: [
            new Equation({ symbol: "X", expression: "1" }),
            new Equation({ symbol: "Y", expression: "0.5" }),
            new Equation({ symbol: "a", expression: "0.6" }),
            new Equation({ symbol: "b", expression: "1.3" }),
            new Equation({ symbol: "c", expression: "1" }),
            new Equation({ symbol: "d", expression: "1" })
        ]
    }));
    projectsToAdd.push(new Project({
        name: "Mixing Problem",
        user: USER.sub,
        equations: [
            new Equation({ symbol: "X", expression: "c * k - X / v * k" })
        ],
        parameters: [
            new Equation({ symbol: "X", expression: "0" }),
            new Equation({ symbol: "k", expression: "10" }),
            new Equation({ symbol: "c", expression: "0.7" }),
            new Equation({ symbol: "v", expression: "500" }),
        ]
    }));
    projectsToAdd.push(new Project({
        name: "Another User's Project",
        user: "another user"
    }));

    Project.insertMany(projectsToAdd, (err) => {
        if (err && err.code === 11000) {
            // E11000 indicates duplicate key
            // This means that the docs are already in the db.
            console.error("DB Bootstrap: database already contains documents");
        }

        if (err) {
            console.error("Boostrap failed!");
            console.error(err);
            throw err;
        }

        if (typeof done === "function") {
            done();
        }
    });
};

/**
 * Removes test data from the database and restores the database to the pre-test state.
 * This function is intended to be called after every test case.
 * @param done Callback for when the database restore operation completes.
 */
bootstrap.restore = function bootstrapRestore(done) {
    Project.remove({}, (err, docs) => {
        if (typeof done === "function") {
            done();
        }
    });
};