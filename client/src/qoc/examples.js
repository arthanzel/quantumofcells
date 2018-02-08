import uid from "./uid";

function createEquation(symbol, expression) {
    return { symbol: symbol, expression: expression, id: uid() };
}

export const sir = {
    equations: [
        createEquation("S", "c*R - a*S*I"),
        createEquation("I", "a*S*I - b*I"),
        createEquation("R", "b*I - c*R")
    ],
    parameters: [
        createEquation("S", "0.99"),
        createEquation("I", "0.1"),
        createEquation("R", "0"),
        createEquation("a", "0.15"),
        createEquation("b", "0.064"),
        createEquation("c", "0")
    ]
};