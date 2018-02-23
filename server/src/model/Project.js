import mongoose from "mongoose";

import { schema as equationSchema } from "./Equation";

const schema = mongoose.Schema({
    name: String,
    equations: [equationSchema],
    resolution: Number,
    time: Number,
    user: { type: String, index: true },
    key: String
});

export default mongoose.model("Project", schema);