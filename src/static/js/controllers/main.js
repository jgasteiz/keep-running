kr.app.controller('Main', ['$scope', '$log', '$location', function($scope, $log, $location) {
    $log.info("Main controller");

    $scope.messages = [];

    /**
     * Closes the alert with the given index.
     * @param index
     */
    $scope.removeMessage = function(index) {
        $scope.messages.splice(index, 1);
    };

    $scope.isActive = function(routes) {
        for (var i in routes) {
            if ($location.path() === routes[i]) {
                return true;
            }
        }
        return false;
    };
}]);