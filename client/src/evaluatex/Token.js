// A `Token` is a generic construct that has a `type` and `value`. Tokens are used by the lexer and parser.
// The lexer assigns each token a type, such as `NUMBER`; and a value, such as the actual numeric value of the token.

/**
 * Token represents a lexical token. It has a type and a value.
 * @param type (String) Token type. A list of types is found in "utils/tokens.js".
 * @param value Value of the token.
 */
export default class Token {
    constructor(type, value = "") {
        this.type = type;
        this.value = value;
    }

    equals(token) {
        return this.type === token.type &&
            this.value === token.value;
    }

    toString() {
        return this.type + "(" + this.value + ")";
    }
};