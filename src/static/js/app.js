var kr = kr || {};

kr.app = angular.module("keepRunning",
    ['ui.bootstrap', 'ngRoute', 'ngResource'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

kr.app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'static/templates/views/dashboard.html',
            controller: 'Dashboard'
        })
        .when('/activities', {
            templateUrl: 'static/templates/views/activities.html',
            controller: 'Activities'
        })
        .when('/new-activity', {
            templateUrl: 'static/templates/views/activity-form.html',
            controller: 'NewActivity'
        })
        .when('/update-activity/:activityId', {
            templateUrl: 'static/templates/views/activity-form.html',
            controller: 'UpdateActivity'
        })
        .otherwise({
            templateUrl: 'static/templates/views/404.html'
        })
}]);
