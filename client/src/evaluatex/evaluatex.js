import lexer from "./lexer";
import parser from "./parser";

export default function evaluatex(expression, locals = {}) {
    let tokens = new lexer(expression, locals);
    let ast = new parser(tokens);
    return function(_locals = {}) { return ast.evaluate(_locals); }
}