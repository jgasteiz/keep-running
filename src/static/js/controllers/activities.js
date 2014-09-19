kr.app.controller('Activities',
['$scope', '$log', '$modal', '$location', 'ActivityUtils', 'Activity',
function($scope, $log, $modal, $location, ActivityUtils, Activity) {
    $log.info("Activities Ctrl");

    var activityUtils = new ActivityUtils();

    var _fetchActivities = function() {
        activityUtils.getActivities({}, function(activities) {
            var allActivities = activityUtils.createActivities(activities);
            $scope.groupedActivities = activityUtils.groupActivities(allActivities);

            if ($scope.groupedActivities.length > 0) {
                $scope.selectedGroups = new Array($scope.groupedActivities.length);
                $scope.selectedGroups = [true];
            }
        });
    };

    $scope.groupedActivities = {};

    /**
     * Starts the process of deleting an activity.
     * @param  {[type]} activityId [description]
     * @return {[type]}            [description]
     */
    $scope.deleteActivity = function(activityId) {

        activityUtils.deleteActivity(activityId,
            function() {
                _fetchActivities();
                $scope.addMessage('success', 'Activity deleted');
            }, function(data) {
                $scope.addMessage('danger', data);
            });
    };

    /**
     * Starts the process of updating an activity.
     * @param  {[type]} activityId [description]
     * @return {[type]}            [description]
     */
    $scope.updateActivity = function(activityId) {
        $location.path('/update-activity/' + activityId);
    };

    /**
     * Marks an activity as selected and shows its details.
     * @param  {[type]} activityId [description]
     * @return {[type]}            [description]
     */
    $scope.showDetail = function(activityId) {
        activityUtils.getActivity(activityId, function(activity) {
            $scope.setActivity(new Activity(activity));
        }, function(data) {
            $scope.addMessage('danger', data);
        });
    };

    _fetchActivities();

}]);