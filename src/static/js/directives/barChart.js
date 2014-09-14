kr.app.directive('barChart', [function() {
    return {
        scope: {
            models: '='
        },
        link: function(scope, element, attrs) {
            var _drawChart = function(activities) {

                var distanceColumns = ['Km'],
                    xAxis = ['x'];
                angular.forEach(activities, function(activity) {
                    distanceColumns.push(activity.getDistance());
                    xAxis.push(activity.date);
                });

                scope.chart = c3.generate({
                    bindto: element.get(0),
                    data: {
                        x: 'x',
                        columns: [
                            xAxis,
                            distanceColumns,
                        ],
                        type: 'bar'
                    },
                    axis: {
                        y: {
                            label: {
                                text: 'Kilometers',
                                position: 'outer-middle'
                            }
                        },
                        x: {
                            height: 60,
                            type : 'timeseries',
                            tick: {
                                format: "%e %b %y",
                                rotate: 75
                            }
                        }
                    },
                    bar: {
                        width: {
                            ratio: 0.5
                        }
                    },
                    legend: {
                        show: false
                    }
                });
            };

            scope.$watch('models', function(activities) {
                _drawChart(activities);
            }, true);
        }
    };
}]);