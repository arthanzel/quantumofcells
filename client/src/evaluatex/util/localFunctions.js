/*
Javascript's Math API omits some important mathematical functions. These are included here.
 */

import merge from "./propertyMerge";

export let fact = function fact(a) {
    let result = 1;

    if (a < 0) {
        throw "Can't factorial a negative.";
    }

    for (a; a > 1; a--) {
        result *= a;
    }
    return result;
};

export let frac = function frac(a, b) {
    return a / b;
};

export let logn = function logn(x, b) {
    return Math.log(x) / Math.log(b);
};

export let rootn = function rootn(x, n) {
    return Math.pow(x, 1 / n);
};

export let sec = function src(x) {
    return 1 / Math.cos(x);
};

export let csc = function csc(x) {
    return 1 / Math.sin(x);
};

export let cot = function cot(x) {
    return 1 / Math.tan(x);
};

let locals = { fact, frac, logn, rootn, sec, csc, cot };
let localFunctions = merge(Math, locals);
export default localFunctions;
