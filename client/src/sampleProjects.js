const sampleProjects = {};
export default sampleProjects;

sampleProjects.geneticNetwork1 = {
    name: "Genetic Network 1"
};

sampleProjects.geneticNetwork2 = {
    name: "Genetic Network 2"
};

sampleProjects.harmonicOscillator = {
    name: "Harmonic Oscillator",
    equations: [
        { symbol: "V", expression: "-k*X" },
        { symbol: "X", expression: "V" }
    ],
    parameters: [
        { symbol: "V", expression: "0" },
        { symbol: "X", expression: "-1" },
        { symbol: "k", expression: "1" }
    ],
    resolution: 100,
    time: 25
};

sampleProjects.logisticGrowth = {};

sampleProjects.lotkaVolterra = {
    name: "Lotka-Volterra",
    equations: [
        { symbol: "X", expression: "a*X - b*X*Y" },
        { symbol: "Y", expression: "c*X*Y - d*Y" }
    ],
    parameters: [
        { symbol: "X", expression: "1" },
        { symbol: "Y", expression: "0.5" },
        { symbol: "a", expression: "0.6" },
        { symbol: "b", expression: "1.3" },
        { symbol: "c", expression: "1" },
        { symbol: "d", expression: "1" }
    ]
};

sampleProjects.mixingProblem = {
    name: "Mixing Problem",
    equations: [
        { symbol: "X", expression: "c * k - X / v * k" }
    ],
    parameters: [
        { symbol: "X", expression: "0" },
        { symbol: "k", expression: "10" },
        { symbol: "c", expression: "0.7" },
        { symbol: "v", expression: "500" },
    ]
};

sampleProjects.trampoline = {
    name: "Trampoline",
    equations: [
        { symbol: "V", expression: "-9.81 + max(0, -k * Y)" },
        { symbol: "Y", expression: "V" }
    ],
    parameters: [
        { symbol: "V", expression: "0" },
        { symbol: "Y", expression: "-0.5" }
    ],
    resolution: 100,
    time: 10
};