kr.app.factory('ActivityFactory', ['$resource', function($resource) {

    /**
     * Activity class. Receives an object with the activity properties.
     *
     * @param properties
     * @constructor
     */
    var Activity = function(properties) {
        this.id = properties.id;
        this.activityType = properties.activity_type;
        this.distance = properties.distance;
        this.calories = properties.calories;
        this.date = properties.date;
        this.startTime = properties.start_time;
        this.duration = properties.duration;
        this.activityNotes = properties.activity_notes;
    };

    /**
     * Returns the Activity distance with two floating digits.
     * @returns {string}
     */
    Activity.prototype.getDistance = function() {
        return this.distance.toFixed(2);
    };

    /**
     * Utils class for activities.
     *
     * @constructor
     */
    var ActivityUtils = function() {};

    /**
     * Create a list of activity objects receiving a list of activity property
     * objects.
     *
     * @param activityList
     * @returns {Array}
     */
    ActivityUtils.prototype.createActivities = function(activityList) {
        var activities = [];
        _.each(activityList, function(activityObj) {
            activities.push(new Activity(activityObj));
        });
        return activities;
    };

    return {
        ActivityResource: $resource('/_api/activities/:id', {id: '@id'}, {
            show: { method: 'GET' },
            update: { method: 'PUT' },
            delete: { method: 'DELETE' }
        }),
        ActivitiesResource: $resource('/_api/activities', {}, {
            query: { method: 'GET', isArray: true },
            create: { method: 'POST' }
        }),
        Activity: Activity,
        ActivityUtils: ActivityUtils
    }
}]);