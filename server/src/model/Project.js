import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: String,
    user: { type: String, index: true }
});

export default mongoose.model("Project", schema);