kr.app.controller('Dashboard', ['$scope', '$log', '$modal', '$location', 'ActivityFactory', function($scope, $log, $modal, $location, ActivityFactory) {
    $log.info("Dashboard Ctrl");

    $scope.stats = ActivityFactory.Stats.query();

    $scope.months = [
        {value: 0, label: 'January'},
        {value: 1, label: 'February'},
        {value: 2, label: 'March'},
        {value: 3, label: 'April'},
        {value: 4, label: 'May'},
        {value: 5, label: 'June'},
        {value: 6, label: 'July'},
        {value: 7, label: 'August'},
        {value: 8, label: 'September'},
        {value: 9, label: 'October'},
        {value: 10, label: 'November'},
        {value: 11, label: 'December'}
    ];

    var now = new Date();
    $scope.currentMonth = $scope.months[now.getMonth()];

    $scope.$watch('currentMonth', function(newVal) {
        now.setMonth(newVal.value);
        _fetchActivities();
    }, true);

    $scope.activities = [];

    var _fetchActivities = function() {
        ActivityFactory.ActivitiesResource.query(
            {
                date: now.getFullYear() + '-' + (now.getMonth() + 1)
            },
            function(activities) {
                $scope.activities = new ActivityFactory.ActivityUtils().createActivities(activities);
            }
        );
    };
    _fetchActivities();

}]);