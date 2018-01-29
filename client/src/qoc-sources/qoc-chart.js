(function() {
    var module = angular.module("qoc-chart", []);

    module.directive("qchart", function($window) {
        var linkFunction = function(scope, element, attrs) {
            // Redraw the graph when data is changed, or on resize.
            $($window).resize(function() { redraw(element, scope.data, scope.options); });
            scope.$watch("data", function() { redraw(element, scope.data, scope.options); });
        };

        return {
            restrict: "E",
            link: linkFunction,
            scope: { data: "=", options: "=" }
        }
    });

    function redraw(element, data, options) {
        var opts = angular.copy(options);
        opts.series = data;

        // TODO: Properly dispose of the chart
        element.highcharts(opts);
    }
})();