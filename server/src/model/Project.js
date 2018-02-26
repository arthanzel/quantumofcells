import mongoose from "mongoose";

import { schema as equationSchema } from "./Equation";

const schema = mongoose.Schema({
    name: { type: String, required: true },
    equations: { type: [equationSchema], required: true, default: [] },
    parameters: { type: [equationSchema], required: true, default: [] },
    resolution: { type: Number, required: true, default: 100 },
    time: { type: Number, required: true, default: 1},
    user: { type: String, required: true },
    key: { type: String }
});

schema.index({ user: 1, name: 1 }, { unique: true })

export default mongoose.model("Project", schema);