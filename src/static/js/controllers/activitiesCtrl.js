kr.app.controller('ActivitiesCtrl', ['$scope', '$log', 'activityService', function($scope, $log, activityService) {
    $log.log("Activities Ctrl");

    $scope.title = 'Activity list';

    $scope.activities = activityService.Activity.query();

}]);