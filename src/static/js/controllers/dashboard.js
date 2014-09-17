kr.app.controller('Dashboard',
['$scope', '$log', '$modal', '$location', 'ActivityFactory',
function($scope, $log, $modal, $location, ActivityFactory) {
    $log.info("Dashboard Ctrl");

    var _fetchActivities = function() {
        ActivityFactory.ActivitiesResource.query(
            { date: $scope.currentDate.format('YYYY-MM') },
            function(activities) {
                $scope.activities = new ActivityFactory.ActivityUtils().createActivities(activities);
            }
        );
    };

    $scope.activities = [];
    $scope.currentDate = moment();
    $scope.stats = ActivityFactory.Stats.query();

    $scope.getMonth = function(monthIndex) {
        return momentService.getMonth(monthIndex);
    };

    $scope.navigateMonth = function(direction) {
        switch (direction) {
            case 'next':
                $scope.currentDate = $scope.currentDate.add(1, 'months');
                break;
            case 'previous':
                $scope.currentDate = $scope.currentDate.subtract(1, 'months');
                break;
            default:
                $scope.currentDate = moment();
                break;
        }
    };

    $scope.$watch('currentDate', function(newVal) {
        _fetchActivities();
    }, true);
}]);