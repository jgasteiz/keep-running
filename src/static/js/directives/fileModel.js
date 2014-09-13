kr.app.directive('fileModel', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$render = function () {
                ngModel.$setViewValue(element.val());
            };

            element.bind('change', function () {
                scope.$apply(function () {
                    ngModel.$render();
                });
            });
        }
    };
}]);