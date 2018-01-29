angular.module("qoc-strings", [])
.value("Strings", {
    equations: "Type in your differential equations here. The variable on the left is the differential, and will be integrated with respect to time. You may use the variable <i>t</i> for time in the equation, as well as any other equation or parameter that you have defined.",
    parameters: "Define initial values for each equation, or any constants that you want available in the differential equations.",
    simulate: "Specify a time to simulate, as well as a resolution (precision). The resolution represents the number of computations per unit of time. Increasing either of these will also increase computation time."
});