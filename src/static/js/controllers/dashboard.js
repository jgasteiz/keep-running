kr.app.controller('Dashboard',
['$scope', '$log', '$modal', '$location', 'ActivityFactory', 'MomentService',
function($scope, $log, $modal, $location, ActivityFactory, MomentService) {
    $log.info("Dashboard Ctrl");

    var momentService = new MomentService();

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

    $scope.currentMonth = new Date().getMonth();
    $scope.currentYear = new Date().getFullYear();

    $scope.getMonth = function(monthIndex) {
        return momentService.getMonth(monthIndex);
    };

    $scope.navigateMonth = function(direction) {
        var newDates;
        switch (direction) {
            case 'next':
                newDates = momentService.getNextMonth($scope.currentMonth, $scope.currentYear);
                break;
            case 'previous':
                newDates = momentService.getPreviousMonth($scope.currentMonth, $scope.currentYear);
                break;
            default:
                newDates = {
                    month: new Date().getMonth(),
                    year: new Date().getFullYear()
                };
                break;
        }
        $scope.currentMonth = newDates.month;
        $scope.currentYear = newDates.year;
    };

    $scope.$watch('currentMonth', function(newVal) {
        _fetchActivities();
    }, true);
}]);