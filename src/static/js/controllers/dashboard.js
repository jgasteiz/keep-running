kr.app.controller('Dashboard',
['$scope', '$log', '$modal', '$location', 'ActivityUtils',
function($scope, $log, $modal, $location, ActivityUtils) {
    $log.info("Dashboard Ctrl");

    var activityUtils = new ActivityUtils();

    var _fetchActivities = function() {
        activityUtils.getActivities({
            date: $scope.currentDate.format('YYYY-MM')
        }, function(activities) {
            $scope.activities = activityUtils.createActivities(activities);
        });
    };

    $scope.activities = [];
    $scope.currentDate = moment();
    $scope.stats = activityUtils.getStats();

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