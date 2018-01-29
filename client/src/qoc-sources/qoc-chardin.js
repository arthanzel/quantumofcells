(function() {
    angular.module("qoc-chardin", ["qoc-strings"])

    .directive("qChardin", function($timeout, Strings) {
        return {
            link: function(scope, element, attrs) {
                var key = attrs.qChardin.replace(/\(.*\)/g, "");
                element.attr("data-intro", Strings[key]);
                element.attr("data-position", "left");
                $timeout(function() {
                    $("body").chardinJs("start");
                }, 0);
            },
            restrict: "A"
        };
    })
})();