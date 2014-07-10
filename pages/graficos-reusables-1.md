---
layout: seccion
title: Gráficos Reusables I
parent:
    url: pages/graficos-reusables.html
    title: Gráficos Reusables
prev:
    url: pages/graficos-reusables.html
    title: Gráficos Reusables
next:
    url: pages/graficos-reusables-2.html
    title: Gráficos Reusables II
---

<div>
    <style>
            .axis path, line {
                fill: none;
                stroke: black;
                stroke-width: 1px;
            }

            .axis text {
                fill: black;
                font-size: 11px;
            }
    </style>
</div>

Vamos a usar el set de datos del ejemplo anterior para crear un tipo de gráfico diferente.

<div class="runnable" id="code-a01">
var data = [
    {nombre: 'Manzana',     color: 'red',    calorias:  52, grasa: 0.2, proteinas:  0.3},
    {nombre: 'Hamburguesa', color: 'brown',  calorias: 295, grasa: 14,  proteinas: 17},
    {nombre: 'Pizza',       color: 'yellow', calorias: 266, grasa: 10,  proteinas: 11},
    {nombre: 'Palta',       color: 'green',  calorias: 160, grasa: 15,  proteinas:  2}
];
</div>
<script>codeBlock().editor('#code-a01').init();</script>

Configuración del gráfico

<div class="runnable" id="code-a02">
var width     = 800,
    height    = 300,
    margin    = {top: 20, right: 20, bottom: 20, left: 40},
    maxRadius = 20,
    duration  = 1e3;

var x = function(d) { return d.proteinas; },
    y = function(d) { return d.calorias; },
    r = function(d) { return d.grasa; };

var div = d3.select('#ejemplo-a01').data([data]);
</div>
<script>codeBlock().editor('#code-a02').init();</script>

Enter

<div class="runnable" id="code-a03">
var svg = div.selectAll('svg').data([data]);

var svgEnter = svg.enter().append('svg');

// Setup SVG
svgEnter
    .attr('id', 'svg-ejemplo-a01')
    .attr('width', width)
    .attr('height', height);

svgEnter.append('g').attr('class', 'chart');
svgEnter.append('g').attr('class', 'axis xaxis');
svgEnter.append('g').attr('class', 'axis yaxis');
</div>
<script>codeBlock().editor('#code-a03').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a01"></div>
</div>

Update groups

<div class="runnable" id="code-a04">
// Update groups
var gchart = svg.selectAll('g.chart').data([data]),
    gxaxis = svg.selectAll('g.xaxis').data([data]),
    gyaxis = svg.selectAll('g.yaxis').data([data]);

gchart.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
gyaxis.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
gxaxis.attr('transform', 'translate(' + margin.left + ',' + (height - margin.bottom) + ')');
</div>

<script>codeBlock().editor('#code-a04').init();</script>

Escalas

<div class="runnable" id="code-a05">
// Escalas
var xScale = d3.scale.linear()
    .domain([0, d3.max(data, x)])
    .range([0, width - margin.left - margin.right]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(data, y)])
    .range([height - margin.top - margin.bottom, 0]);

var rScale = d3.scale.sqrt()
    .domain([0, d3.max(data, r)])
    .range([0, maxRadius]);
</div>
<script>codeBlock().editor('#code-a05').init();</script>

Ejes

<div class="runnable" id="code-a07">
// Axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');

gxaxis.call(xAxis);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

gyaxis.call(yAxis);
</div>
<script>codeBlock().editor('#code-a07').init();</script>

<div class="ejemplo">
  <svg height="300px">
    <use xlink:href="#svg-ejemplo-a01" />
  </svg>
</div>

Circulos

<div class="runnable" id="code-a06">
// Circles
var circles = gchart.selectAll('circle.bubble').data(data);

circles.enter().append('circle')
    .attr('class', 'bubble')
    .attr('cx', function(d) { return xScale(x(d)); })
    .attr('cy', function(d) { return yScale(y(d)); });

circles.transition().duration(duration)
    .attr('r', function(d) { return rScale(r(d)); })
    .attr('cx', function(d) { return xScale(x(d)); })
    .attr('cy', function(d) { return yScale(y(d)); });

circles.exit().transition().duration(duration)
    .attr('r', 0);
</div>
<script>codeBlock().editor('#code-a06').init();</script>



