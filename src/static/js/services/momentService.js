kr.app.factory('MomentService', [function() {

    var MomentService = function() {
        this.months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
    };

    MomentService.prototype.getMonth = function(monthIndex) {
        return this.months[monthIndex];
    };

    MomentService.prototype.getNextMonth = function(currentMonth, currentYear) {
        var newMonth = currentMonth + 1,
            newYear = currentYear;
        if (newMonth > 11) {
            newMonth = 11;
            newYear = newYear + 1;
        }
        return {
            month: newMonth,
            year: newYear
        };
    };

    MomentService.prototype.getDurationFromSeconds = function(seconds) {
        return moment.duration(seconds, 'seconds').format("h [hrs], m [min], s [sec]");
    };

    MomentService.prototype.getPreviousMonth = function(currentMonth, currentYear) {
        var newMonth = currentMonth - 1,
            newYear = currentYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear = newYear - 1;
        }
        return {
            month: newMonth,
            year: newYear
        };
    };

    return MomentService;
}]);