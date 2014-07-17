function barChart() {

    // Atributos por defecto del gráfico
    var width     = 800,
        height    = 300,
        margin    = {top: 30, right: 20, bottom: 20, left: 40},
        duration  = 1e3,
        label     = function(d) { return d.x; },
        x         = function(d) { return d.y; };

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

            // Update groups
            var gchart = svg.selectAll('g.chart').data([data]),
                gxaxis = svg.selectAll('g.xaxis').data([data]),
                gyaxis = svg.selectAll('g.yaxis').data([data]);

            svg.attr('width', width).attr('height', height);

            gchart.attr('transform', 'translate(' + 0 + ',' + margin.top + ')');
            gxaxis.attr('transform', 'translate(' + margin.left + ',' + (height - margin.bottom) + ')');

            // Escalas
            var xScale = d3.scale.linear()
                .domain([0, d3.max(data, x)])
                .range([0, width - margin.left - margin.right]);

            var yScale = d3.scale.ordinal()
                .domain(d3.range(data.length))
                .rangeBands([0, height - margin.top - margin.bottom], 0.1);

            // Axis
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            gxaxis.call(xAxis);

            // Rectangles
            var rect = gchart.selectAll('rect.bars').data(data);

            rect.enter().append('rect')
                .attr('class', 'bars')
                .attr('x', margin.left)
                .attr('y', function(d, i) { return yScale(i); })
                .attr('width', 0)
                .attr('height', yScale.rangeBand());

            rect.transition().duration(duration)
                .attr('width', function(d) { return xScale(x(d)); });

            rect.exit().remove();

            // Labels
            var labels = gchart.selectAll('text.label').data(data);

            labels.enter().append('text')
                .attr('class', 'label')
                .attr('text-anchor', 'end')
                .attr('x', margin.left - 10)
                .attr('y', function(d, i) { return yScale(i) + yScale.rangeBand(); })
                .text(label);

            labels.transition().delay(duration)
                .text(label);

            labels.exit().remove();

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

    chart.label = function(value) {
        if (!arguments.length) { return label; }
        label = value;
        return chart;
    };

    return chart;
}