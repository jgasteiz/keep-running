kr.app.controller('NewActivityCtrl', ['$scope', '$log', '$location', 'ActivityFactory', function($scope, $log, $location, ActivityFactory) {
    $log.info("New Activity Ctrl");

    $scope.title = 'New activity';

    var _getDefaultValues = function() {
        var today = new Date(),
            year = today.getFullYear(),
            month = (today.getMonth() + 1),
            day = today.getDate();

        if (String(month).length === 1) {
            month = "0" + month;
        }

        return {
            activityType: 'running',
            date: year + '-' + month + '-' + day
        };
    };

    $scope.activity = _getDefaultValues();

    $scope.submit = function(form) {

        $scope.submitted = true;

        if (form.$invalid) {
            return;
        }

        var activityResource = new ActivityFactory({
            activity_type: this.activity.activityType,
            distance: this.activity.distance,
            calories: this.activity.calories,
            date: this.activity.date,
            duration: this.activity.duration
        });

        activityResource.$save();
        $location.path("/activities");
    };

}]);