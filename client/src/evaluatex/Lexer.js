import { sprintf } from "sprintf-js";

import tokens from "util/tokens";
import Token from "Token";

// The lexer reads a math expression and breaks it down into easily-digestible "tokens".
// A string of tokens, such as `NUMBER(4) PLUS NUMBER(2)` can be more easily understood by machines than raw math.

export default class Lexer {
    constructor(buffer) {
        this.buffer = buffer;
        this.cursor = 0;
        this.tokens = [];
        this.lex();
    }

    hasNext() {
        return this.cursor < this.buffer.length;
    }

    next() {
        if (!this.hasNext()) {
            throw "Lexer error: reached end of stream";
        }

        for ([type, regex] of tokens) {
            let match = regex.exec(this.buffer.substr(this.cursor));

            if (match && match.index === 0) {
                this.cursor += match[0].length;
                return new Token(type, match[0]);
            }
        }

        throw "Lexer error: can't match any token";
    }

    lex() {
        while (this.hasNext()) {
            var token = this.next();
            this.tokens.push(token);
        }
    }

    toString() {
        var tokenStrings = [];
        for (i in this.tokens) {
            tokenStrings.push(this.tokens[i].toString());
        }
        return tokenStrings.join(" ");
    }
};
