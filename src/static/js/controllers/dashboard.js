kr.app.controller('Dashboard', ['$scope', '$log', '$modal', '$location', 'ActivityFactory', function($scope, $log, $modal, $location, ActivityFactory) {
    $log.info("Dashboard Ctrl");

    $scope.stats = ActivityFactory.Stats.query();

}]);