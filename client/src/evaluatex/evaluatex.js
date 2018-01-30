import Lexer from "./lexer";
import Parser from "./parser";
import * as localFunctions from "./util/localFunctions";

export default function evaluatex(expression, locals = {}) {
    let l = new Lexer(expression);
    let p = new Parser(l.tokens, locals);
    let ast = p.parse();
    return function(_locals = {}) { ast.evaluate(_locals); }
}