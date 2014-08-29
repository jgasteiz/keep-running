kr.app.controller('ActivitiesCtrl', ['$scope', '$log', 'ActivitiesFactory', 'ActivityFactory', function($scope, $log, ActivitiesFactory, ActivityFactory) {
    $log.info("Activities Ctrl");

    $scope.title = 'Activity list';

    $scope.activities = ActivitiesFactory.query();

    $scope.deleteActivity = function(activityId) {
        ActivityFactory.delete({id: activityId});
    }

}]);