kr.app.controller('ActivitiesCtrl', ['$scope', '$log', '$modal', '$location', 'ActivityFactory', function($scope, $log, $modal, $location, ActivityFactory) {
    $log.info("Activities Ctrl");

    var _fetchActivities = function() {
        ActivityFactory.ActivitiesResource.query(function(activities) {
            $scope.activities = new ActivityFactory.ActivityUtils().createActivities(activities);
        });
    };

    var _addMessage = function(type, message) {
        $scope.messages.push({
            type: type,
            msg: message
        });
    };

    $scope.selectedActivity = null;

    $scope.deleteActivity = function(activityId) {

        $modal.open({
            templateUrl: 'static/templates/modal.html',
            size: 'sm',
            controller: function ($scope, $modalInstance) {

                $scope.title = 'Delete activity';
                $scope.content = 'Are you sure you want to delete this activity?';

                $scope.ok = function () {
                    ActivityFactory.ActivityResource.delete({id: activityId}, function() {
                        _fetchActivities();
                        _addMessage('success', 'Activity deleted');
                        $modalInstance.close();
                    },
                    function(data) {
                        _addMessage('danger', data);
                        $modalInstance.close();
                    });
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
    };

    $scope.updateActivity = function(activityId) {
        $location.path('/update-activity/' + activityId);
    };

    $scope.showDetail = function(activityId) {
        ActivityFactory.ActivityResource.show({id: activityId}, function(activity) {
            $scope.selectedActivity = new ActivityFactory.Activity(activity);
        }, function(data) {
            _addMessage('danger', data);
        });
    };

    _fetchActivities();

}]);