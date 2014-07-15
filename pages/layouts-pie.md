---
layout: seccion
title: Pie Layout
parent:
    url: pages/layouts.html
    title: Layouts
prev:
    url: pages/layouts.html
    title: Layouts
next:
    url: pages/layouts-histogram.html
    title: Histogram
---

<div>
    <style>
        .arc {
            fill: #fa5555;
            fill-opacity: 0.6;
            stroke: #ca3333;
            stroke-width: ;
        }
    </style>
</div>

Los layout son funciones que transforman datos de una representación a otra, usualmente para que sea más fácil generar cierto tipo de gráficos. No tienen una representación visual determinada, sólo son transformaciones en los datos.

Para crear un _donut chart_, necesitamos un conjunto de datos categóricos con una variable cuantitativa que representen partes de un total.

<div class="runnable" id="code-b01">
var desayuno = [
    {item: 'Café',     precio: 1300, calorias:   0},
    {item: 'Sandwich', precio: 2500, calorias: 295},
    {item: 'Manzana',  precio:  500, calorias:  52}
];
</div>
<script>codeBlock().editor('#code-b01').init();</script>

D3 tiene funciones que transforman los datos en representaciones más adecuadas para cierto tipo de gráficos. Por ejemplo, para generar un donut chart, podemos usar el _pie layout_, que calcula porcentajes y ángulos para crear el gráfico.

<div class="runnable" id="code-b02">
var pie = d3.layout.pie()
    .value(function(d) { return d.precio; });

var pieData = pie(desayuno);

console.log(pieData);
</div>
<script>codeBlock().editor('#code-b02').init();</script>

Los datos son convertidos en una representación alternativa, que además de contener los datos originales, tiene los ángulos que permitirán dibujar los arcos. Notar que los ángulos están en _radianes_.

<div class="runnable" id="code-b03">
var arcItem = {
    data: {
        item:     "Café",
        precio:   1300,
        calorias: 0
    },
    value:      1300,
    startAngle: 3.653014713476504,
    endAngle:   5.5525823644842855
};
</div>
<script>codeBlock().editor('#code-b03').init();</script>

La nueva representación nos permite generar rápidamente un _pie chart_ o un _donut chart_ usando generadores.

### Generadores SVG

Los elementos de una imagen SVG son una descripción de cómo dibujarlos. Por ejemplo, para crear un círculo, sólo necesitamos escribir el markup del elemento: `<circle cx='10' cy='10' r='5'></circle>`. Esto funciona bien para elementos simples, para elementos más complejos como líneas curvas, arcos o mapas, necesitaremos usar el elemento `path`.

Un `path` es un string que describe una forma como una serie de movimientos de un cursor, usando un mini-lenguaje diseñado para esto. Por ejemplo, para dibujar un arco, el elemento path sería:

`<path d="M-73.41267717166284,130.80741122157113A150,150 0 0,...,43.60247040719038Z"></path>`.

<div class="ejemplo">
<svg width=600 height=300>
    <g transform="translate(300, 150)">
        <path d="M-73.41267717166284,130.80741122157113A150,150 0 0,1 -100.09782168333587,-111.71582741156718L-33.365940561111955,-37.23860913718906A50,50 0 0,0 -24.47089239055428,43.60247040719038Z" fill="#fa0000"></path>
    </g>
</svg>
</div>

Afortunadamente, no necesitamos escribir el string que describe el path manualmente, D3 provee funciones reusables que calculan el string por nosotros. Estas funciones usan la estructura de los gráficos reusables, y asumen que los datos tienen cierta estructura.

#### Arc Generator

Para generar un arco, necesitamos un objeto que tenga los atributos `startAngle` y `endAngle`. La función que genera los arcos requiere un radio interno y un radio externo.

<div class="runnable" id="code-b04">
var arc = d3.svg.arc()
    .innerRadius(80)
    .outerRadius(140);

var arcPath = arc(arcItem);
</div>
<script>codeBlock().editor('#code-b04').init();</script>

Este generador se puede usar junto al _pie layout_ para crear un _donut chart_

<div class="runnable" id="code-b05">
var div = d3.select('#ejemplo-b01'),
    svg = div.selectAll('svg').data([pieData]);

svg.enter().append('svg')
    .attr('width',  300)
    .attr('height', 300);

var gPie = svg.selectAll('g.donut-chart').data([pieData]);

gPie.enter().append('g')
    .classed('donut-chart', true)
    .attr('transform', 'translate(150, 150)');

gPie.exit().remove();

var arcPaths = gPie.selectAll('path.arc').data(pieData);

arcPaths.enter().append('path')
    .classed('arc', true);

// arcPaths.attr('d', arc);
arcPaths.attr('d', function(d) { return arc(d); });

arcPaths.exit().remove();
</div>
<script>codeBlock().editor('#code-b05').init();</script>

<div class="ejemplo">
    <div id="ejemplo-b01"></div>
</div>

### Pie Chart Reutilizable

<div class="runnable" id="code-b06">
function donutChart() {

    var me = {
        width:  400,
        height: 400,
        outerRadius: 180,
        innerRadius: 130,
        value: function(d) { return d.value; },
        color: function(d, i) { return d.color; }
    };

    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]);

            svg.enter().append('svg');

            svg
                .attr('width',  me.width)
                .attr('height', me.height);

            var gChart = svg.selectAll('g.chart').data([data]);

            gChart.enter().append('g')
                .classed('chart', true);

            gChart.attr('transform', 'translate(' + me.width / 2 + ',' + me.height / 2 +')');

            // Compute the pie Layout
            var pieLayout = d3.layout.pie()
                .value(me.value);

            var pieData = pieLayout(data);

            // Arc Generator
            var arcGenerator = d3.svg.arc()
                .innerRadius(me.innerRadius)
                .outerRadius(me.outerRadius);

            var arcPaths = gChart.selectAll('path.arco').data(pieData);

            arcPaths.enter().append('path')
                .classed('arco', true);

            arcPaths
                .attr('d', arcGenerator)
                .attr('fill', function(d, i) { return me.color(d, i); });

            arcPaths.exit().remove();
        });
    }

    chart.innerRadius = function(value) {
        if (!arguments.length) { return me.innerRadius; }
        me.innerRadius = value;
        return chart;
    };

    chart.outerRadius = function(value) {
        if (!arguments.length) { return me.outerRadius; }
        me.outerRadius = value;
        return chart;
    };

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

    chart.value = function(valueAccessor) {
        if (!arguments.length) { return me.value; }
        me.value = valueAccessor;
        return chart;
    };

    chart.color = function(color) {
        if (!arguments.length) { return me.color; }
        me.color = color;
        return chart;
    };

    return chart;
}
</div>
<script>codeBlock().editor('#code-b06').init();</script>

<div class="runnable" id="code-b07">

var colorScale = d3.scale.category10()
    .domain(d3.range(desayuno.lenght));

var donut = donutChart()
    .value(function(d) { return d.precio; })
    .color(function(d, i) { return colorScale(i); });

d3.select('#ejemplo-b02')
    .data([desayuno])
    .call(donut);
</div>
<script>codeBlock().editor('#code-b07').init();</script>

<div class="ejemplo">
    <div id="ejemplo-b02"></div>
</div>

