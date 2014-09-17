kr.app.directive('barChart', ['MomentService', function(MomentService) {
    return {
        replace: true,
        scope: {
            models: '=',
            title: '@',
            yAxis: '@',
            columnUnits: '@',
            property: '@',
            format: '@'
        },
        templateUrl: '/static/templates/directives/bar-chart.html',
        link: function(scope, element) {

            var momentService = new MomentService();

            var _drawChart = function(activities) {

                var columns = [scope.columnUnits],
                    xAxis = ['x'];
                angular.forEach(activities, function(activity) {

                    var value = activity[scope.property];
                    if (scope.format === 'duration') {
                        value = moment.duration(value).asSeconds();
                    }

                    columns.push(value);
                    xAxis.push(activity.date);
                });

                scope.chart = c3.generate({
                    bindto: element.find('#chart').get(0),
                    data: {
                        x: 'x',
                        columns: [
                            xAxis,
                            columns,
                        ],
                        type: 'bar'
                    },
                    axis: {
                        y: {
                            label: {
                                text: scope.yAxis,
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
                    },
                    tooltip: {
                    format: {
                        value: function (value, ratio, id) {
                            switch (id) {
                                case 'Time':
                                    value = momentService.getDurationFromSeconds(value);
                                    break;
                            }
                            return value;
                        }
                    }
                }
                });
            };

            scope.$watch('models', function(activities) {
                _drawChart(activities);
            }, true);
        }
    };
}]);