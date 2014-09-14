kr.app.controller('Dashboard', ['$scope', '$log', '$modal', '$location', 'ActivityFactory', function($scope, $log, $modal, $location, ActivityFactory) {
    $log.info("Dashboard Ctrl");

    var _fetchActivities = function() {
        ActivityFactory.ActivitiesResource.query(
            {
                date: $scope.currentYear + '-' + ($scope.currentMonth + 1)
            },
            function(activities) {
                $scope.activities = new ActivityFactory.ActivityUtils().createActivities(activities);
            }
        );
    };

    $scope.stats = ActivityFactory.Stats.query();
    $scope.activities = [];

    $scope.months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    $scope.currentMonth = new Date().getMonth();
    $scope.currentYear = new Date().getFullYear();

    $scope.nextMonth = function() {
        var newMonth = $scope.currentMonth + 1;
        if (newMonth > 11) {
            newMonth = 11;
            $scope.currentYear = $scope.currentYear + 1;
        }
        $scope.currentMonth = newMonth;
    };

    $scope.previousMonth = function() {
        var newMonth = $scope.currentMonth - 1;
        if (newMonth < 0) {
            newMonth = 11;
            $scope.currentYear = $scope.currentYear - 1;
        }
        $scope.currentMonth = newMonth;
    };

    $scope.$watch('currentMonth', function(newVal) {
        _fetchActivities();
    }, true);
}]);