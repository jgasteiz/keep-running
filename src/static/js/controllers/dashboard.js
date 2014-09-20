kr.app.controller('Dashboard',
['$scope', '$log', '$modal', '$location', 'ActivityUtils',
function($scope, $log, $modal, $location, ActivityUtils) {
    $log.info("Dashboard Ctrl");

    var activityUtils = new ActivityUtils();

    var _fetchActivities = function(mode) {
        var format;
        switch (mode) {
            case 'month':
                format = 'YYYY-MM';
                break;
            case 'year':
                format = 'YYYY';
                break;
        }
        activityUtils.getActivities({
            date: $scope.currentDate.format(format)
        }, function(activities) {
            $scope.activities = activityUtils.createActivities(activities);
        });
    };

    $scope.activities = [];
    $scope.currentDate = moment();
    $scope.stats = activityUtils.getStats();

    $scope.selectedMode = 'month';
    
    /**
     * Change the mode of showing activities.
     * @param  {[type]} mode [description]
     * @return {[type]}      [description]
     */
    $scope.changeMode = function(mode) {
        $scope.selectedMode = mode;
        _fetchActivities(mode);
    }

    $scope.currentModeHumanized = function() {
        switch ($scope.selectedMode) {
            case 'month':
                return 'Current month';
            case 'year':
                return 'Current year';
        }
    };

    $scope.getCurrentDate = function() {
        switch ($scope.selectedMode) {
            case 'month':
                return $scope.currentDate.format('MMMM YYYY');
            case 'year':
                return $scope.currentDate.format('YYYY');
        }
    };

    $scope.navigateDate = function(direction) {
        switch ($scope.selectedMode) {
            case 'month':
                _navigateMonth(direction);
                break;
            case 'year':
                _navigateYear(direction);
                break;
        }
    };

    $scope.isCurrentDate = function() {
        switch ($scope.selectedMode) {
            case 'month':
                return _isCurrentMonth();
            case 'year':
                return _isCurrentYear();
        }
    };

    /////////////////////
    /// Month view
    /////////////////////

    /**
     * Returns true if the selected `currentDate` month equals the actual month.
     * @return {Boolean} [description]
     */
    var _isCurrentMonth = function() {
        var today = moment();
        return today.month() <= $scope.currentDate.month()
                && today.year() === $scope.currentDate.year();
    };

    /**
     * Moves the current date to the next month.
     * @param  {[type]} direction [description]
     * @return {[type]}           [description]
     */
    var _navigateMonth = function(direction) {
        switch (direction) {
            case 'next':
                $scope.currentDate = $scope.currentDate.add(1, 'months');
                break;
            case 'previous':
                $scope.currentDate = $scope.currentDate.subtract(1, 'months');
                break;
            default:
                $scope.currentDate = moment();
                break;
        }
    };

    /////////////////////
    /// Year view
    /////////////////////

    /**
     * Returns true if the selected `currentDate` year equals the actual year.
     * @return {Boolean} [description]
     */
    var _isCurrentYear = function() {
        var today = moment();
        return $scope.currentDate.year() >= today.year();
    };

    /**
     * Moves the current date to the next year.
     * @param  {[type]} direction [description]
     * @return {[type]}           [description]
     */
    var _navigateYear = function(direction) {
        switch (direction) {
            case 'next':
                $scope.currentDate = $scope.currentDate.add(1, 'years');
                break;
            case 'previous':
                $scope.currentDate = $scope.currentDate.subtract(1, 'years');
                break;
            default:
                $scope.currentDate = moment();
                break;
        }
    };

    $scope.$watch('currentDate', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            _fetchActivities($scope.selectedMode);
        }
    }, true);
}]);