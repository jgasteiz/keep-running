kr.app.service('activityService', ['$resource', function($resource) {

    return {
        Activity: $resource('/_api/activities')
    };
}]);