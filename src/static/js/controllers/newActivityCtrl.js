kr.app.controller('NewActivityCtrl', ['$scope', '$log', '$location', 'ActivityFactory', function($scope, $log, $location, ActivityFactory) {
    $log.info("New Activity Ctrl");

    var _getDefaultValues = function() {
        var today = new Date(),
            year = today.getFullYear(),
            month = (today.getMonth() + 1),
            day = today.getDate();

        if (String(month).length === 1) {
            month = "0" + month;
        }
        if (String(day).length === 1) {
            day = "0" + day;
        }

        return {
            activity_type: 'running',
            date: year + '-' + month + '-' + day
        };
    };

    $scope.title = 'New activity';

    $scope.activity = new ActivityFactory.Activity(_getDefaultValues());

    $scope.submit = function(form) {

        $scope.submitted = true;

        if (form.$invalid) {
            return;
        }

        new ActivityFactory.ActivityResource({
            activity_type: this.activity.activityType,
            distance: this.activity.distance,
            calories: this.activity.calories,
            date: this.activity.date,
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