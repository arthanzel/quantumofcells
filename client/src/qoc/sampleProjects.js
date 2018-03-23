const sampleProjects = [];
export default sampleProjects;

// sampleProjects.geneticNetwork1 = {
//     name: "Genetic Network 1"
// };

// sampleProjects.geneticNetwork2 = {
//     name: "Genetic Network 2"
// };

sampleProjects.push({
    _id: "logisticGrowth",
    name: "Logistic Growth",
    equations: [
        { symbol: "N", expression: "r * N * (k - N) / k" }
    ],
    parameters: [
        { symbol: "N", expression: "1" },
        { symbol: "r", expression: "7" },
        { symbol: "k", expression: "500" }
    ],
    resolution: 100,
    time: 2
});

sampleProjects.push({
    _id: "cooling",
    name: "Newton's Law of Cooling",
    equations: [
        { symbol: "T", expression: "k * (Ta - T)" }
    ],
    parameters: [
        { symbol: "T", expression: "60" },
        { symbol: "Ta", expression: "23" },
        { symbol: "k", expression: "0.15" }
    ],
    resolution: 50,
    time: 30
});

sampleProjects.push({
    _id: "harmonicOscillator",
    name: "Sample: Harmonic Oscillator",
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
});

// sampleProjects.logisticGrowth = {};

sampleProjects.push({
    _id: "lotkaVolterra",
    name: "Sample: Lotka-Volterra",
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
    ],
    time: 50,
    resolution: 100
});

sampleProjects.push({
    _id: "mixingProblem",
    name: "Sample: Mixing Problem",
    equations: [
        { symbol: "X", expression: "c * k - X / v * k" }
    ],
    parameters: [
        { symbol: "X", expression: "0" },
        { symbol: "k", expression: "10" },
        { symbol: "c", expression: "0.7" },
        { symbol: "v", expression: "500" },
    ],
    time: 250,
    resolution: 20
});

sampleProjects.push({
    _id: "trampoline",
    name: "Sample: Trampoline",
    equations: [
        { symbol: "V", expression: "-9.81 + max(0, -k * Y)" },
        { symbol: "Y", expression: "V" }
    ],
    parameters: [
        { symbol: "V", expression: "0" },
        { symbol: "Y", expression: "-0.5" },
        { symbol: "k", expression: "150" }
    ],
    time: 10,
    resolution: 100
});