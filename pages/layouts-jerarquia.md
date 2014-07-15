---
layout: seccion
title: Layouts Jerárquicos
parent:
    url: pages/layouts.html
    title: Layouts
prev:
    url: pages/layouts-datos-externos.html
    title: Datos Externos
next:
    url: pages/next.html
    title: Next
---

<div>
    <style>
        .pack {
            fill: #5555ff;
            fill-opacity: 0.2;
        }

        .label {
            font-size: 10px;
        }
    </style>
</div>


Estructura de datos anidada.

<div class="runnable" id="code-a01">
var root = {
    name: "América",
    children: [
        {
            name: "América del Sur",
            children: [
                {name: "Chile",     poblacion:  17},
                {name: "Perú",      poblacion:  23},
                {name: "Bolivia",   poblacion:   7},
                {name: "Argentina", poblacion: 100}
            ]
        },
        {
            name: "América Central",
            children: [
                {name: "Guatemala",  poblacion: 5},
                {name: "Honduras",   poblacion: 4},
                {name: "Costa Rica", poblacion: 2}
            ]
        },
        {
            name: "América del Norte",
            children: [
                {name: "Canadá",         poblacion: 80},
                {name: "Estados Unidos", poblacion: 300},
                {name: "México",         poblacion: 130}
            ]
        }
    ]
};
</div>
<script>codeBlock().editor('#code-a01').init();</script>


### Cluster

El layout cluster transforma esta estructura en una estructura mas apropiada para graficos de cierto tipo. Aca generamos estructuras planas de nodos y links.

<div class="runnable" id="code-a02">
var width  = 600,
    height = 600,
    padding = 150;

var cluster = d3.layout.cluster()
    .size([height, width - 2 * padding]);

var nodes = cluster.nodes(root),
    links = cluster.links(nodes);
</div>
<script>codeBlock().editor('#code-a02').init();</script>

Ahora podemos usar estos arreglos para dibujar el arbol.

<div class="runnable" id="code-a03">
var div = d3.select('#ejemplo-a01'),
    svg = div.selectAll('svg').data([nodes]);

svg.enter().append('svg')
    .attr('width', width)
    .attr('height', height);

var circles = svg.selectAll('circle.nodes').data(nodes);

circles.enter().append('circle')
    .attr('cx', function(d) { return d.y; })
    .attr('cy', function(d) { return d.x; })
    .attr('r', 4);

var labels = svg.selectAll('text.label').data(nodes);

labels.enter().append('text')
    .classed('label', true)
    .attr('x', function(d) { return d.y; })
    .attr('y', function(d) { return d.x; })
    .attr('text-anchor', function(d) { return d.children ? 'end' : 'start'; })
    .text(function(d) { return d.name; });

labels.exit().remove();

var lines = svg.selectAll('line.link').data(links);

lines.enter().append('line')
    .classed('link', true)
    .attr('stroke', 'black')
    .attr('x1', function(d) { return d.source.y; })
    .attr('x2', function(d) { return d.target.y; })
    .attr('y1', function(d) { return d.source.x; })
    .attr('y2', function(d) { return d.target.x; });

lines.exit().remove();
</div>
<script>codeBlock().editor('#code-a03').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a01"></div>
</div>

Ahora, este layout, permite generar otros tipos de graficos, por ejemplo, radial


<div class="runnable" id="code-a04">
var div = d3.select('#ejemplo-a02'),
    svg = div.selectAll('svg').data([root]);

var radius = 400;

var cluster = d3.layout.cluster()
    .size([2 * Math.PI, radius]);

var nodes = cluster.nodes(root),
    links = cluster.links(nodes);

svg.enter().append('svg')
    .attr('width', 2 * radius)
    .attr('height', 2 * radius);

var circles = svg.selectAll('circle.nodes').data(nodes);

circles.enter().append('circle')
    .classed('nodes', true);

circles
    .attr('cx', function(d) { return radius + d.y * Math.cos(d.x); })
    .attr('cy', function(d) { return radius + d.y * Math.sin(d.x); })
    .attr('r', 4);

circles.exit().remove();

var lines = svg.selectAll('line.link').data(links);

lines.enter().append('line')
    .classed('link', true);

lines
    .attr('stroke', 'blue')
    .attr('x1', function(d) { return radius + d.source.y * Math.cos(d.source.x); })
    .attr('x2', function(d) { return radius + d.target.y * Math.cos(d.target.x); })
    .attr('y1', function(d) { return radius + d.source.y * Math.sin(d.source.x); })
    .attr('y2', function(d) { return radius + d.target.y * Math.sin(d.target.x); });

lines.exit().remove();

var labels = svg.selectAll('text.label').data(nodes);

labels.enter().append('text')
    .classed('label', true);

labels
    .attr('x', function(d) { return radius + d.y * Math.cos(d.x); })
    .attr('y', function(d) { return radius + d.y * Math.sin(d.x); })
    .text(function(d) { return d.name; });

labels.exit().remove();
</div>
<script>codeBlock().editor('#code-a04').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a02"></div>
</div>

### Pack

<div class="runnable" id="code-b01">
var diameter = 400;

var pack = d3.layout.pack()
    .size([diameter - 4, diameter - 4])
    .value(function(d) { return d.poblacion; });

var packItems = pack(root);

var div = d3.select('#ejemplo-b01'),
    svg = div.selectAll('svg').data([root]);

svg.enter().append('svg')
    .attr('width', diameter)
    .attr('height', diameter);

var bubbles = svg.selectAll('circle.pack').data(packItems);

bubbles.enter().append('circle')
    .classed('pack', true);

bubbles
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r',  function(d) { return d.r; });

bubbles.exit().remove();

var labels = svg.selectAll('text.label').data(packItems);

labels.enter().append('text')
    .classed('label', true);

labels
    .attr('text-anchor', 'middle')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .text(function(d) { return d.children ? '' : d.name; });

labels.exit().remove();
</div>
<script>codeBlock().editor('#code-b01').init();</script>

<div class="ejemplo">
    <div id="ejemplo-b01"></div>
</div>

