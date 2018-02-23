import mongoose from "mongoose";

export const schema = mongoose.Schema({
    symbol: String,
    expression: String,
    project: mongoose.Schema.Types.ObjectId,
    key: String
});

export default mongoose.model("Equation", schema);