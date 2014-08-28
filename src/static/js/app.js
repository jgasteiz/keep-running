var kr = kr || {};

kr.app = angular.module("keepRunning",
    ['ui.bootstrap', 'ngRoute', 'ngResource'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

kr.app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'static/templates/views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/activities', {
            templateUrl: 'static/templates/views/activities.html',
            controller: 'ActivitiesCtrl'
        })
        .when('/new-activity', {
            templateUrl: 'static/templates/views/new-activity.html',
            controller: 'NewActivityCtrl'
        })
        .otherwise({
            templateUrl: 'static/templates/views/404.html'
        })
}]);
