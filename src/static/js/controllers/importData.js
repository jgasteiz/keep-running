kr.app.controller('ImportData', ['$scope', '$log', '$location', '$http', function($scope, $log, $location, $http) {
    $log.info("Import Data Ctrl");

    $scope.title = 'Import your data from Runkeeper';

    $scope.activity = {};

    $scope.submit = function(form) {

        $scope.submitted = true;

        if (form.$invalid) {
            return;
        }

        $http({
            method: 'POST',
            url: '/activities/import_data/',
            cache: false,
            data: new FormData($scope.formElement),
            transformRequest: false,
            headers: {'Content-Type': undefined}
        }).success(function(data) {
            if (data.success === true) {
                $scope.addMessage('success', data.message);
                $location.path("/activities");
            } else {
                $scope.addMessage('danger', data.message + ', ' + data.errors);
            }
        }).error(function(data) {
            $scope.addMessage('danger', 'There was an error: ' + data);
        });

    };

}]);