kr.app.controller('ActivitiesCtrl', ['$scope', '$log', 'ActivitiesFactory', 'ActivityFactory', function($scope, $log, ActivitiesFactory, ActivityFactory) {
    $log.info("Activities Ctrl");

    $scope.title = 'Activity list';

    $scope.selectedActivity = null;

    $scope.activities = ActivitiesFactory.query();

    $scope.deleteActivity = function(activityId) {
        ActivityFactory.delete({id: activityId}, function() {
            $scope.activities = ActivitiesFactory.query();
        }, function(data) {
            $scope.messages = data;
        });
    };

    $scope.showDetail = function(activityId) {
        ActivityFactory.show({id: activityId}, function(activity) {
            $scope.selectedActivity = activity;
        }, function(data) {
            $scope.messages = data;
        });
    };

}]);