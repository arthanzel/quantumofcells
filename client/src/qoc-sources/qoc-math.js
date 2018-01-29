(function() {
    var module = angular.module("qoc-math", []);

    module.value("QMath", {
        /**
         * Returns the maximum element of an array.
         * @param  {Array} data Array in which to find the minimum.
         * @param  {Function} predicate Optional. This function is called once for every element in the array, takes one parameter (the array element), and returns a transformed value.
         */
        max: function(data, predicate) {
            if (!angular.isArray(data)) {
                throw "Data parameter must be an array!";
            }
            else if (data.length == 0) {
                return null;
            }

            if (predicate) {
                if (!angular.isFunction(predicate)) {
                    throw "Predicate parameter must be a function!";
                }
            }
            else {
                predicate = function(x) { return x; }
            }

            // Calculate the minimum
            var max = predicate(data[0]);
            for (var i = 1; i < data.length; i++) {
                if (data[i] > max) {
                    max = data[i];
                }
            }

            return max;
        },

        /**
         * Returns the minimum element of an array.
         * @param  {Array} data      Array in which to find the minimum.
         * @param  {Function} predicate Optional. This function is called once for every element in the array, takes one parameter (the array element), and returns a transformed value.
         */
        min: function(data, predicate) {
            if (!angular.isArray(data)) {
                throw "Data parameter must be an array!";
            }
            else if (data.length == 0) {
                return null;
            }

            if (predicate) {
                if (!angular.isFunction(predicate)) {
                    throw "Predicate parameter must be a function!";
                }
            }
            else {
                predicate = function(x) { return x; }
            }

            // Calculate the minimum
            var min = data[0];
            for (var i = 1; i < data.length; i++) {
                if (data[i] < min) {
                    min = data[i];
                }
            }

            return min;
        }
    });
})();