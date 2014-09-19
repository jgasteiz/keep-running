kr.app.controller('NewActivity',
['$scope', '$log', '$location', 'ActivityUtils', 'Activity',
function($scope, $log, $location, ActivityUtils, Activity) {
    $log.info("New Activity Ctrl");

    var activityUtils = new ActivityUtils();
    
    $scope.title = 'New activity';

    $scope.activity = new Activity({
        activity_type: 'running',
        date: new Date()
    });

    $scope.submit = function(form) {

        $scope.submitted = true;

        if (form.$invalid) {
            return;
        }

        activityUtils.createActivity(
            this.activity,
            function() {
                $scope.addMessage('success', 'Activity created');
                $location.path("/activities");
            }, function() {
                $scope.addMessage('danger', 'There was an error creating the activity');
                $location.path("/activities");
            });
    };

}]);