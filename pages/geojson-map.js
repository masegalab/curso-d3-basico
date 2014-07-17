function geojsonMap() {

    var me = {
        height: 300,
        width:  600,
        projection: d3.geo.equirectangular(),
        scale: 600 / (2 * Math.PI)
    };

    function chart(selection) {
        selection.each(function(features) {

            var div = d3.select(this),
                svg = div.selectAll('svg.geojson-map').data([features]);

            svg.enter().append('svg')
                .classed('geojson-map', true);

            svg.attr('width', me.width).attr('height', me.height);

            svg.exit().remove();

            // Background
            var background = svg.selectAll('rect.background').data([features]);

            background.enter().append('rect')
                .classed('background', true);

            background
                .attr('width', me.width)
                .attr('height', me.height);

            background.exit().remove();

            // Configure the projection
            me.projection
                .translate([me.width / 2, me.height / 2])
                .scale(me.scale);

            var pathGenerator = d3.geo.path()
                .projection(me.projection);

            // Graticule
            var graticule = d3.geo.graticule();

            var graticuleLines = svg.selectAll('path.graticule').data([graticule()]);

            graticuleLines.enter().append('path')
                .classed('graticule', true);

            graticuleLines
                .attr('d', pathGenerator);

            graticuleLines.exit().remove();

            // Render the features
            var pathFeatures = svg.selectAll('path.feature').data(features);

            pathFeatures.enter().append('path')
                .classed('feature', true);

            pathFeatures.attr('d', pathGenerator);

            pathFeatures.exit().remove();
        });
    }

    chart.width = function(value) {
        if (!arguments.length) { return me.width; }
        me.width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) { return me.height; }
        me.height = value;
        return chart;
    };

    chart.projection = function(value) {
        if (!arguments.length) { return me.projection; }
        me.projection = value;
        return chart;
    };

    chart.scale = function(value) {
        if (!arguments.length) { return me.scale; }
        me.scale = value;
        return chart;
    };

    return chart;
};