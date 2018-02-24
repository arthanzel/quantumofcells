import lexer from "./lexer";
import parser from "./parser";

export default function evaluatex(expression, locals = {}) {
    const tokens = new lexer(expression, locals);
    const ast = new parser(tokens).simplify();
    const fn = function(_locals = {}) { return ast.evaluate(_locals); };
    fn.ast = ast;
    fn.expression = expression;
    return fn;
}