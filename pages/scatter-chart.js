function scatterChart() {

    // Atributos por defecto del gráfico
    var width     = 800,
        height    = 300,
        margin    = {top: 30, right: 20, bottom: 20, left: 40},
        maxRadius = 20,
        duration  = 1e3,
        x         = function(d) { return d.x; },
        y         = function(d) { return d.y; },
        r         = function(d) { return d.z; },
        color     = function(d) { return d.color; };

    // Creación y actualización del grafico
    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]);

            var svgEnter = svg.enter().append('svg');

            // Setup SVG
            svgEnter
                .attr('width', width)
                .attr('height', height);

            svgEnter.append('g').attr('class', 'chart');
            svgEnter.append('g').attr('class', 'axis xaxis');
            svgEnter.append('g').attr('class', 'axis yaxis');

            // Update groups
            var gchart = svg.selectAll('g.chart').data([data]),
                gxaxis = svg.selectAll('g.xaxis').data([data]),
                gyaxis = svg.selectAll('g.yaxis').data([data]);

            svg.attr('width', width).attr('height', height);

            gchart.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            gyaxis.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            gxaxis.attr('transform', 'translate(' + margin.left + ',' + (height - margin.bottom) + ')');

            // Escalas
            var xScale = d3.scale.linear()
                .domain([0, d3.max(data, x)])
                .range([0, width - margin.left - margin.right]);

            var yScale = d3.scale.linear()
                .domain([0, d3.max(data, y)])
                .range([height - margin.top - margin.bottom, 0]);

            var rScale = d3.scale.sqrt()
                .domain([0, d3.max(data, r)])
                .range([5, maxRadius]);

            // Axis
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            gxaxis.call(xAxis);

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left');

            gyaxis.call(yAxis);

            // Circles
            var circles = gchart.selectAll('circle.bubble').data(data);

            circles.enter().append('circle')
                .attr('class', 'bubble')
                .attr('cx', function(d) { return xScale(x(d)); })
                .attr('cy', function(d) { return yScale(y(d)); })
                .attr('fill', function(d) { return color(d); })
                .attr('opacity', 0.7)
                .attr('stroke', 'black')
                .attr('stroke-width','1')
                .on('mouseover', function(d) { d3.select(this).classed('node-highlight', true); })
                .on('mouseout', function(d) { d3.select(this).classed('node-highlight', false); });

            circles.transition().duration(duration)
                .attr('r', function(d) { return rScale(r(d)); })
                .attr('cx', function(d) { return xScale(x(d)); })
                .attr('cy', function(d) { return yScale(y(d)); });

            circles.exit().transition().duration(duration)
                .attr('r', 0);

            // END COPY PASTE

        });
    }

    // Funciones de configuración

    chart.height = function(value) {
        if (!arguments.length) { return height; }
        height = value;
        return chart;
    };

    chart.width = function(value) {
        if (!arguments.length) { return width; }
        width = value;
        return chart;
    };

    chart.margin = function(value) {
        if (!arguments.length) { return margin; }
        margin = value;
        return chart;
    };

    chart.x = function(value) {
        if (!arguments.length) { return x; }
        x = value;
        return chart;
    };

    chart.y = function(value) {
        if (!arguments.length) { return y; }
        y = value;
        return chart;
    };

    chart.r = function(value) {
        if (!arguments.length) { return r; }
        r = value;
        return chart;
    };

    chart.color = function(value) {
        if (!arguments.length) { return color; }
        color = value;
        return chart;
    };

    return chart;
}