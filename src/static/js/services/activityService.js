kr.app.factory('ActivitiesFactory', ['$resource', function ($resource) {
    return $resource('/_api/activities', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}]);

kr.app.factory('ActivityFactory', ['$resource', function ($resource) {
    return $resource('/_api/activities/:id', {id: '@id'}, {
        show: { method: 'GET' },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
    })
}]);