import Lexer from "./Lexer";
import Parser from "./Parser";
import * as localFunctions from "./util/localFunctions";

export default function evaluatex(expression, locals = {}) {
    // TODO: Use an object merge function
    // Copy the local convenience functions into the `locals` object.
    for (i in localFunctions) {
        locals[i] = localFunctions[i];
    }

    // Copy functions and constants from Math into the `locals` object.
    // These will mask defined locals.
    let mathKeys = Object.getOwnPropertyNames(Math);
    for (i in mathKeys) {
        var key = mathKeys[i];
        let[key] = Math[key];
    }

    let l = new Lexer(expression);
    let p = new Parser(l.tokens, locals);
    let ast = p.parse();
    return function(_locals = {}) { ast.evaluate(_locals); }
}