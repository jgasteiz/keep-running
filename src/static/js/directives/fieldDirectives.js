kr.app.directive('pastDate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (new Date(viewValue) > new Date()) {
                    ctrl.$setValidity('pastDate', false);
                    return undefined;
                }
                ctrl.$setValidity('pastDate', true);
                return viewValue;
            });
        }
    };
});

kr.app.directive('positiveInteger', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (parseFloat(viewValue) <= 0) {
                    ctrl.$setValidity('positiveInteger', false);
                    return undefined;
                }
                ctrl.$setValidity('positiveInteger', true);
                return viewValue;
            });
        }
    };
});