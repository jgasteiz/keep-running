kr.app.controller('UpdateActivity',
['$scope', '$log', '$location', '$routeParams', 'ActivityUtils', 'Activity',
function($scope, $log, $location, $routeParams, ActivityUtils, Activity) {
    $log.info("Update Activity Ctrl");

    var activityUtils = new ActivityUtils();

    $scope.submitted = true;

    $scope.title = 'Update activity';

    activityUtils.getActivity($routeParams.activityId, function(activity) {
        $scope.activity = new Activity(activity);
    });

    $scope.submit = function(form) {

        if (form.$invalid) {
            return;
        }

        activityUtils.updateActivity(
            this.activity,
            function() {
                $scope.addMessage('success', 'Activity updated');
                $location.path("/activities");
            }, function() {
                $scope.addMessage('danger', 'There was an error updating the activity');
                $location.path("/activities");
            });
    };

}]);
