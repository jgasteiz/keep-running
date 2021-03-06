kr.app.controller('Main',
['$scope', '$log', '$location', '$timeout', 'config',
function($scope, $log, $location, $timeout, config) {
    $log.info("Main controller");

    /**
     * List of messages that will be used for showing success/error messages.
     * @type {Array}
     */
    $scope.messages = [];

    $scope.selectedActivity = null;

    /**
     * Sets the given activity as selected;
     * @param activity
     */
    $scope.setActivity = function(activity) {
        $scope.selectedActivity = activity;
    };

    /**
     * Returns true if the activity passed as a parameter has the id of the
     * selected activity.
     * @param activity
     * @returns {boolean}
     */
    $scope.isActivitySelected = function(activity) {
        return $scope.selectedActivity !== null && $scope.selectedActivity.id === activity.id;
    };

    /**
     * Closes the alert with the given index.
     * @param index
     */
    $scope.removeMessage = function(index) {
        $scope.messages.splice(index, 1);
    };

    $scope.addMessage = function(type, message) {
        $scope.messages.push({
            type: type,
            msg: message
        });
        var messageIndex = $scope.messages.length - 1;
        $timeout(function() {
            $scope.removeMessage(messageIndex);
        }, 6000);
    };

    $scope.isMenuItemActive = function(route, multipleRoutes) {
        var routes = [];
        if (multipleRoutes) {
            routes = config.routes[route];
        } else {
            routes.push(route);
        }
        for (var i in routes) {
            if ($location.path() === routes[i]) {
                return true;
            }
        }
        return false;
    };
}]);