kr.app.controller('ActivitiesCtrl', ['$scope', '$log', '$location', 'ActivityFactory', function($scope, $log, $location, ActivityFactory) {
    $log.info("Activities Ctrl");

    var _fetchActivities = function() {
        ActivityFactory.ActivitiesResource.query(function(activities) {
            $scope.activities = new ActivityFactory.ActivityUtils().createActivities(activities);
        });
    };

    $scope.selectedActivity = null;

    $scope.deleteActivity = function(activityId) {
        ActivityFactory.ActivityResource.delete({id: activityId}, function() {
            _fetchActivities();
        }, function(data) {
            $scope.messages = data;
        });
    };

    $scope.updateActivity = function(activityId) {
        $location.path('/update-activity/' + activityId);
    };

    $scope.showDetail = function(activityId) {
        ActivityFactory.ActivityResource.show({id: activityId}, function(activity) {
            $scope.selectedActivity = new ActivityFactory.Activity(activity);
        }, function(data) {
            $scope.messages = data;
        });
    };

    _fetchActivities();

}]);