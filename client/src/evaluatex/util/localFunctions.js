/*
Javascript's Math API omits some important mathematical functions. These are included here.
 */

let fact = function fact(a) {
    let result = 1;

    if (a < 0) {
        throw "Can't factorial a negative.";
    }

    for (a; a > 1; a--) {
        result *= a;
    }
    return result;
}

let frac = function frac(a, b) {
    return a / b;
};

let logn = function logn(x, b) {
    return Math.log(x) / Math.log(b);
};

let rootn = function rootn(x, n) {
    return Math.pow(x, 1 / n);
};

let sec = function src(x) {
    return 1 / Math.cos(x);
};

let csc = function csc(x) {
    return 1 / Math.sin(x);
};

let cot = function cot(x) {
    return 1 / Math.tan(x);
};

export { fact, frac, logn, rootn, sec, csc, cot };