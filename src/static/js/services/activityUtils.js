kr.app.factory('ActivityUtils', ['$resource', '$modal', 'Activity', function($resource, $modal, Activity) {

    var ActivityResource = $resource('/_api/activities/:id', {id: '@id'}, {
        show: { method: 'GET' },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
    });

    var ActivitiesResource = $resource('/_api/activities', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });

    var StatsResource = $resource('/_api/stats', {}, {
        query: { method: 'GET', isArray: true },
    });

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
     * @param activityObjs
     * @returns {Array}
     */
    ActivityUtils.prototype.createActivities = function(activityObjs) {
        var activities = [];
        _.each(activityObjs, function(activityObj) {
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

    ActivityUtils.prototype.deleteActivity = function(activityId, deleteSuccess, deleteError) {
        $modal.open({
            templateUrl: 'static/templates/modal.html',
            size: 'sm',
            controller: function ($scope, $modalInstance) {

                $scope.title = 'Delete activity';
                $scope.content = 'Are you sure you want to delete this activity?';
                $scope.yes = 'Yes, delete';
                $scope.no = 'No';

                $scope.ok = function () {
                    ActivityResource.delete({id: activityId}, 
                        function() {
                            deleteSuccess();
                            $modalInstance.close();
                        }, function() {
                            deleteError();
                            $modalInstance.close();
                        });
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
    };

    ActivityUtils.prototype.createActivity = function(activity, createSuccess, createError) {
        new ActivityResource({
            activity_type: activity.activityType,
            distance: activity.distance,
            calories: activity.calories,
            date: activity.getFormattedDate(),
            start_time: activity.startTime,
            duration: activity.duration,
            activity_notes: activity.activityNotes
        }).$save(createSuccess, createError);
    };

    ActivityUtils.prototype.updateActivity = function(activity, updateSuccess, updateError) {
        ActivityResource.update({id: activity.id}, {
            activity_type: activity.activityType,
            distance: activity.distance,
            calories: activity.calories,
            date: activity.getFormattedDate(),
            start_time: activity.startTime,
            duration: activity.duration,
            activity_notes: activity.activityNotes
        }, updateSuccess, updateError);
    };

    ActivityUtils.prototype.getActivities = function(query, querySuccess) {
        return ActivitiesResource.query(query, querySuccess);
    };

    ActivityUtils.prototype.getActivity = function(activityId, showSuccess, showError) {
        return ActivityResource.show({id: activityId}, showSuccess, showError);
    };

    ActivityUtils.prototype.getStats = function() {
        return StatsResource.query();
    };

    return ActivityUtils;
}]);