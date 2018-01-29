(function() {
    var module = angular.module("quantumofcells", [
        "qoc-chart",
        "qoc-solver",
        "qoc-chardin"
    ]);

    module.controller("QOCController", function($scope, QOCSolver, QOCTools) {
        // HighCharts options
        $scope.options = {
            chart: {
                type: "spline"
            },
            legend: {
                floating: true,
                verticalAlign: "top"
            },
            plotOptions: {
                series: {
                    animation: false,
                    lineWidth: 3,
                    states: { hover: false },
                    marker: {
                        enabled: false,
                        states: { hover: false }
                    }
                }
            },
            tooltip: {
                enabled: false
            },
            title: {
                text: ""
            },
            xAxis: {
                title: { text: "Time (s)" }
            },
            yAxis: {
                title: { text: "" }
            }
        };

        $scope.equations = [
            { variable: "S", expression: "c*R - a*S*I" },
            { variable: "I", expression: "a*S*I - b*I" },
            { variable: "R", expression: "b*I - c*R" }
        ];
        $scope.parameters = [
            { symbol: "S", value: 0.99   }, // Initial susceptible population
            { symbol: "I", value: 0.01   }, // Initial infected population
            { symbol: "R", value: 0      }, // Initial recovered population
            { symbol: "a", value: 0.1507 }, // Infection rate
            { symbol: "b", value: 0.063  }, // Recovery rate
            { symbol: "c", value: 0      }  // Loss of immunity rate
        ];

        $scope.time = 200;
        $scope.resolution = 250;
        
        $scope.addEquation = function() {
            $scope.equations.push({ variable: "", expression: "" });
        };
        $scope.deleteEquation = function(i) {
            $scope.equations.splice(i, 1);
        };
        $scope.deleteParameter = function(i) {
            $scope.parameters.splice(i, 1);
        };
        $scope.addParameter = function() {
            $scope.parameters.push({ symbol: "", value: "" });
        };

        $scope.simulate = function() {
            var paramMap = {};
            for (p in $scope.parameters) {
                p = $scope.parameters[p];
                paramMap[p.symbol] = parseFloat(p.value);
            }

            var time = 10;
            var resolution = 500;
            var result = QOCSolver.solve($scope.equations,
                paramMap,
                $scope.time,
                $scope.resolution);
            console.log(result);
            $scope.data = QOCTools.dataToHighCharts(result, 500);
            //$(".toolbox").fadeOut(500);
        };
    });

    module.value("QOCTools", {
        dataToHighCharts: function(data, points) {
            points = points || 500;
            var hcData = [];

            for (variable in data) {
                var values = data[variable];
                var series = { name: variable, data: [] };

                for (var i = 0; i < points; i++) {
                    var percentile = i / (points - 1);
                    var indexAtPercentile = Math.ceil((values.length - 1) * percentile);

                    series.data.push(values[indexAtPercentile]);
                }

                hcData.push(series);
            }

            return hcData;
        }
    });
})();