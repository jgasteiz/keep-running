var keepr = keepr || {};

(function() {
    "use strict";

    keepr.opts = {};

    keepr.opts.months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    keepr.opts.activityListUrl = "/activities/json/";

    if (window.location.search.indexOf('?date=') > -1) {
        keepr.opts.activityListUrl = String(keepr.opts.activityListUrl + window.location.search);
    }

    // Main container id, width and height.
    keepr.opts.containerId = 'bar-chart';
    keepr.opts.containerWidth = $('#' + keepr.opts.containerId).width();
    keepr.opts.containerHeight = 500;

    // Define some options
    keepr.opts.margin = {top: 40, right: 20, bottom: 120, left: 40};
    keepr.opts.width = keepr.opts.containerWidth - keepr.opts.margin.left - keepr.opts.margin.right;
    keepr.opts.height = keepr.opts.containerHeight - keepr.opts.margin.top - keepr.opts.margin.bottom;

    // Axis functions
    var x = d3.scale.ordinal().rangeRoundBands([0, keepr.opts.width], .1);
    var y = d3.scale.linear().range([keepr.opts.height, 0]);

    // Both axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // Tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-12, 0])
        .html(function(d) {
            var distance = parseFloat(d.fields.distance).toFixed(2),
                date = new Date(d.fields.date),
                duration = d.fields.duration,
                displayDate = keepr.opts.months[date.getMonth()] + ' ' +
                    date.getDate() + ', ' + date.getFullYear(),
                tooltipTemplate = $('#bar-chart-tooltip').text();

            if (duration[0] == '0' && duration[1] == '0') {
                duration = duration.replace('00:', '');
            }

            return _.template(tooltipTemplate, {
                'distance': distance,
                'date': displayDate,
                'duration': duration,
                'calories': d.fields.calories
            });
        });

    // Main svg
    var svg = d3.select("#bar-chart").append("svg")
        .attr("width", keepr.opts.width + keepr.opts.margin.left + keepr.opts.margin.right)
        .attr("height", keepr.opts.height + keepr.opts.margin.top + keepr.opts.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + keepr.opts.margin.left + "," + keepr.opts.margin.top + ")");

    svg.call(tip);

    d3.json(keepr.opts.activityListUrl, function(error, data) {

        x.domain(data.map(function(d) {
            return d.fields.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.fields.distance;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + keepr.opts.height + ")")
            .call(xAxis)
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function(d) {
                    return "rotate(-65)"
                });

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -30)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Distance (in km)");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.fields.date); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.fields.distance); })
            .attr("height", function(d) { return keepr.opts.height - y(d.fields.distance); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)

    });

})();