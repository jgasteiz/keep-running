kr.app.controller('NewActivity', ['$scope', '$log', '$location', 'ActivityFactory', function($scope, $log, $location, ActivityFactory) {
    $log.info("New Activity Ctrl");

    $scope.title = 'New activity';

    $scope.activity = new ActivityFactory.Activity({
        activity_type: 'running',
        date: new Date()
    });

    $scope.submit = function(form) {

        $scope.submitted = true;

        if (form.$invalid) {
            return;
        }

        new ActivityFactory.ActivityResource({
            activity_type: this.activity.activityType,
            distance: this.activity.distance,
            calories: this.activity.calories,
            date: this.activity.getDate(),
            start_time: this.activity.startTime,
            duration: this.activity.duration,
            activity_notes: this.activity.activityNotes
        }).$save(function() {
            $log.info('Activity created');
            $location.path("/activities");
        }, function() {
            $log.warn('There was an error creating the activity');
            $location.path("/activities");
        });
    };

}]);