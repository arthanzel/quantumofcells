import mongoose from "mongoose";

/**
 * An Equation represents a symbol-expression pair, with the symbol being the left-hand side and the expression being
 * the right-hand side of an equation.
 */
export const equationSchema = mongoose.Schema({
    symbol: { type: String, default: "", maxlength: 10 },
    expression: { type: String, default: "", maxlength: 500 }
});

export default mongoose.model("Equation", equationSchema);