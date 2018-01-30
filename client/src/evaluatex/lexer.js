import Token from "./Token";
import { tokenPatterns } from "./Token";

/**
 * The lexer reads a math expression and breaks it down into easily-digestible Tokens.
 * A list of valid tokens can be found lower in this file.
 * @param equation (String) The equation to lex.
 * @returns {Array} An array of Tokens.
 */
export default function lexer(equation) {
    let l = new Lexer(equation);
    l.lex();

    // Convert the array of tokens into a String - useful for testing.
    l.tokens.toString = function() {
        let tokenStrings = [];
        for (let token of t) {
            tokenStrings.push(token.toString());
        }
        return tokenStrings.join(" ");
    };

    return l.tokens;
}

class Lexer {
    constructor(buffer) {
        this.buffer = buffer;
        this.cursor = 0;
        this.tokens = [];
    }

    lex() {
        while (this.hasNext()) {
            let token = this.next();
            if (token.type !== "TWS") {
                // Whitespace tokens don't affect evaluation, so don't bother
                // adding them to the token list.
                this.tokens.push(token);
            }
        }
    }

    hasNext() {
        return this.cursor < this.buffer.length;
    }

    // Get the next token from the buffer
    next() {
        if (!this.hasNext()) {
            throw "Lexer error: reached end of stream";
        }

        // Try to match each pattern in tokenPatterns to the remaining buffer.
        for (let i of tokenPatterns) {
            let type = i[0];
            let regex = i[1];

            // Force the regex to match only at the beginning of the string.
            regex = new RegExp(/^/.source + regex.source);

            let match = regex.exec(this.buffer.substr(this.cursor));
            if (match) {
                this.cursor += match[0].length;
                return new Token(type, match[0]);
            }
        }

        throw "Lexer error: can't match any token";
    }
}