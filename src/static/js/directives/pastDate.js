kr.app.directive('pastDate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (moment(viewValue) > moment()) {
                    ctrl.$setValidity('pastDate', false);
                    return undefined;
                }
                ctrl.$setValidity('pastDate', true);
                return viewValue;
            });
        }
    };
});