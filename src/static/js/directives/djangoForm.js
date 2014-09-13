kr.app.directive('djangoForm', ['$compile', function($compile) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var formHTML = document.getElementById(attrs.formId).innerHTML,
                linkFn = $compile(formHTML);
            element.html(linkFn(scope));
            scope.formElement = element.find('form').get(0);
        }
    };
}]);