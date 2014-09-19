kr.app.factory('Activity', [function() {

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
     * @return {String}
     */
    Activity.prototype.getFormattedDate = function() {
        return moment(this.date).format('YYYY-MM-DD');
    };

    /**
     * Returns the Activity date in the format `September 2014`.
     * @return {String}
     */
    Activity.prototype.getMonthYear = function() {
        return moment(this.date).format('MMMM YYYY');
    };

    /**
     * Returns the Activity date in the format `Sun 19th`.
     * @return {String}
     */
    Activity.prototype.getDay = function() {
        return moment(this.date).format('ddd Do');
    };

    return Activity;
}]);