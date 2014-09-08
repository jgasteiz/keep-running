kr.app.directive('dates', function() {
    return {
        controller: function($scope) {
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.clear = function () {
                $scope.model = null;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
        },
        link: function(scope, element, attrs) {
            scope.model = attrs.model;
        }
    };
});