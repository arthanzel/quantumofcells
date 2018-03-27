import mongoose from "mongoose";

import { equationSchema } from "./Equation";

/**
 * A Project represents a dynamical system. It is composed of equations, parameters, and variables that specify how
 * the system is to be solved.
 * A Project is associated with one user. The user's identity reflects the <code>sub</code> field of the JSON Web Token,
 * which is provided by clients in the request's <code>Authorization</code> header.
 */
const projectSchema = mongoose.Schema({
    name: { type: String, required: true, maxlength: 100 },
    equations: {
        type: [equationSchema],
        required: true,
        default: [],
        validate: [arrayMaxLength(10), "A project can't have more than 10 equations."]
    },
    parameters: {
        type: [equationSchema],
        required: true,
        default: [],
        validate: [arrayMaxLength(30), "A project can't have more than 30 parameters."]
    },
    resolution: { type: Number, required: true, default: 100 },
    time: { type: Number, required: true, default: 1},
    user: { type: String, required: true }
});

// Ensure that no user has two projects with the same name.
// Quickly find all projects belonging to a user, in alphabetical order.
projectSchema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model("Project", projectSchema);

function arrayMaxLength(max) {
    return (val) => val.length <= max;
}
