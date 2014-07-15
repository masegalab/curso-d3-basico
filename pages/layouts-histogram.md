---
layout: seccion
title: Histogram Layout
parent:
    url: pages/graficos-reutilizables.html
    title: Gráficos Reutilizables
prev:
    url: pages/layouts-pie.html
    title: Pie Layout
next:
    url: pages/layouts-jerarquico.html
    title: Datos Jerárquicos
---

Cargamos los datos usando d3.json. Recordar que es asincrono.

<div class="runnable" id="code-a01">
var datos;
d3.json('/assets/data/food.json', function(error, data) {

    if (error) { console.error(error); }

    datos = data;
});
</div>
<script>codeBlock().editor('#code-a01').init();</script>

Setup

<div class="runnable" id="code-a02">
var width  = 800,
    height = 600,
    margin = 20;

var value = function(d) { return d.calorias; }
</div>
<script>codeBlock().editor('#code-a02').init();</script>

Creamos el hist layout

<div class="runnable" id="code-a03">
//Escala en x
var xScale = d3.scale.linear()
    .domain([0,d3.max(datos, value)])
    .range([0,width]);

//Layout
var histLayout = d3.layout.histogram()
    .bins(xScale.ticks(10))
    .value(value);
</div>
<script>codeBlock().editor('#code-a03').init();</script>

como quedan los datos

<div class="runnable" id="code-a04">
var hist = histLayout(datos);
</div>
<script>codeBlock().editor('#code-a04').init();</script>




El código

<div class="runnable" id="code-a05">

var yScale = d3.scale.linear()
    .domain([0, d3.max(hist, function (d) { return d.y; })])
    .range([0,height]);

//Creando svg
var svg = d3.select('#ejemplo-a01').selectAll('svg').data([hist]);

svg.enter().append('svg');

svg
    .attr('width', width)
    .attr('height', height);

// Creando grupos

var gBars = svg.selectAll('g.bar').data(hist);

gBars.enter().append('g')
    .classed('bar', true);

gBars.attr('transform', function(d) {
    return 'translate(' + xScale(d.x) + ', ' + 0 + ')';
});

gBars.exit().remove();

var rects = gBars.selectAll('rect.bar').data(function(d) { return [d]; });

rects.enter().append('rect')
    .classed('bar', true)
    .attr('fill', 'black')
    .attr('x', 2)
    .attr('y', height)
    .attr('width', 36)
    .attr('height', 0);

rects.transition().duration(2000)
    .attr('y', function(d) { return height - yScale(d.y)})
    .attr('height', function (d) { return yScale(d.y)});

rects.exit().remove();
</div>
<script>codeBlock().editor('#code-a05').init();</script>

El div

<div class="ejemplo">
    <div id="ejemplo-a01"></div>
</div>
