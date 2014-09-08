kr.app.controller('UpdateActivity', ['$scope', '$log', '$location', '$routeParams', 'ActivityFactory', function($scope, $log, $location, $routeParams, ActivityFactory) {
    $log.info("Update Activity Ctrl");

    /**
     * We'll keep here the Activity Resource for easily updating it later.
     *
     * @type {null}
     */
    var activityResource = null;

    $scope.submitted = true;

    $scope.title = 'Update activity';

    activityResource = ActivityFactory.ActivityResource.show({id: $routeParams.activityId}, function(activity) {
        $scope.activity = new ActivityFactory.Activity(activity);
    });

    $scope.submit = function(form) {

        if (form.$invalid) {
            return;
        }

        ActivityFactory.ActivityResource.update({id: activityResource.id}, {
            activity_type: this.activity.activityType,
            distance: this.activity.distance,
            calories: this.activity.calories,
            date: this.activity.date,
            start_time: this.activity.startTime,
            duration: this.activity.duration,
            activity_notes: this.activity.activityNotes
        }, function() {
            $log.info('Activity updated');
            $location.path("/activities");
        }, function() {
            $log.warn('There was an error updated the activity');
            $location.path("/activities");
        });
    };

}]);