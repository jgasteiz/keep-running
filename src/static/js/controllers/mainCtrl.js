kr.app.controller('MainCtrl', ['$scope', '$log', '$location', function($scope, $log, $location) {
    $log.info("This is the main controller");

    $scope.messages = [];

    $scope.isActive = function(route) {
        return $location.path().indexOf(route) === 0;
    };
}]);