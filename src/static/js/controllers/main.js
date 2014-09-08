kr.app.controller('Main', ['$scope', '$log', '$location', function($scope, $log, $location) {
    $log.info("Main controller");

    $scope.messages = [];

    $scope.isActive = function(routes) {
        for (var i in routes) {
            if ($location.path() === routes[i]) {
                return true;
            }
        }
        return false;
    };
}]);