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
     * Returns the Activity date in the format dd-mm-yyyy.
     * @returns {string}
     */
    Activity.prototype.getDate = function() {
        if (typeof(this.date) === "object") {
            return this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
        }
        return new Date(this.date);
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

    /**
     * Group all activities by year-month. The final structure in
     * `groupedActivities` should look like:
     *
     *  [
     *      {
     *          title: 'September 2014',
     *          activities: [
     *              { // activity 1 }, { // activity 2 }, ...
     *          ]
     *      },
     *      ...
     *  ]
     * 
     * @param  {Array}
     * @return {Array}
     */
    ActivityUtils.prototype.groupActivities = function(activities) {
        var oldDate,
            groupIndex = -1,
            groupedActivities = [];

        // Group all activities
        angular.forEach(activities, function(activity) {
            var newDate = activity.getMonthYear();
            
            // If the year-month is different from the previous value, new group.
            if (oldDate !== newDate) {
                groupIndex += 1;
                groupedActivities[groupIndex] = {
                    title: newDate,
                    activities: []
                };
            }

            // Push the current activity in the current group.
            groupedActivities[groupIndex].activities.push(activity);
            oldDate = newDate;
        });

        return groupedActivities;
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
        Stats: $resource('/_api/stats', {}, {
            query: { method: 'GET', isArray: true },
        }),
        Activity: Activity,
        ActivityUtils: ActivityUtils
    }
}]);