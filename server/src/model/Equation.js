import mongoose from "mongoose";

export const schema = mongoose.Schema({
    symbol: String,
    expression: String,
    key: String
});

export default mongoose.model("Equation", schema);