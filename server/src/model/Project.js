import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: String,
    user: String
});

export default mongoose.model("Project", schema);