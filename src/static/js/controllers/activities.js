kr.app.controller('Activities', ['$scope', '$log', '$modal', '$location', 'ActivityFactory', function($scope, $log, $modal, $location, ActivityFactory) {
    $log.info("Activities Ctrl");

    var activityUtils = new ActivityFactory.ActivityUtils();

    var _fetchActivities = function() {
        ActivityFactory.ActivitiesResource.query(function(activities) {
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

        var deleteSuccess = function() {
            _fetchActivities();
            $scope.addMessage('success', 'Activity deleted');
        };

        var deleteError = function(data) {
            $scope.addMessage('danger', data);
        };

        activityUtils.deleteActivity(activityId, deleteSuccess, deleteError);
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
        ActivityFactory.ActivityResource.show({id: activityId}, function(activity) {
            $scope.setActivity(new ActivityFactory.Activity(activity));
        }, function(data) {
            $scope.addMessage('danger', data);
        });
    };

    _fetchActivities();

}]);