---
layout: seccion
title: Graficando Relaciones
parent:
    url: pages/layouts.html
    title: Layouts
prev:
    url: pages/prev.html
    title: Prev
next:
    url: pages/next.html
    title: Next
---

Tenemos datos que representan relaciones. la estructura de los datos está compuesta de nodos que representan entidades, y links que representan relaciones entre las entidades.

<div class="runnable" id="code-a01">
// Entidades
var nodes = [
    {name: 'A', color: 'red'},     // 0
    {name: 'B', color: 'blue'},    // 1
    {name: 'C', color: 'green'},   // 2
    {name: 'D', color: 'yellow'}   // 3
];
// Relaciones entre las entidades
var links = [
    {source: 0, target: 1},
    {source: 0, target: 2},
    {source: 1, target: 2},
    {source: 1, target: 3},
    {source: 1, target: 3}
];
</div>
<script>codeBlock().editor('#code-a01').init();</script>

Aquí, la entidad **A** está relacionada con las entidades **B** y **C**, pero no con **D**. D3 tiene layouts para transformar esta estructura en una visualización de la red.

### Force Layout

El force layout simula una fuerza gravitacional con repulsión entre los nodos. Con los parámetros adecuados, permite dibujar elemenos sin que se traslapen demamsiado. Está diseñado para datos que representan relaciones.

<div class="runnable" id="code-a02">
var width  = 300,
    height = 300;

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-400)
    .gravity(0.2)
    .size([width, height]);
</div>
<script>codeBlock().editor('#code-a02').init();</script>

El force layout calcula posiciones óptimas para los nodos, usando la simulación de fuerzas. Para que empiece el cálculo, hay que invocar el método `start()`.

<div class="runnable" id="code-a03">
force.start();
</div>
<script>codeBlock().editor('#code-a03').init();</script>

Los nodos son extendidos, ahora tienen index, posición, peso y momentum.

<div class="runnable" id="code-a04">
var nodo = {
    color:  "red",
    index:  0,
    name:   "A",
    px:     308.69924879528753,
    py:     197.36366137277378,
    weight: 2,
    x:      308.715038678495,
    y:      197.35672484112365
};
</div>
<script>codeBlock().editor('#code-a04').init();</script>

Ahora tenemos un arreglo de elementos que podemos graficar como antes.

<div class="runnable" id="code-a05">
var div = d3.select('#ejemplo-a01'),
    svg = div.selectAll('svg').data([nodes]);

svg.enter().append('svg');

svg.attr('width', width).attr('height', height);

var circles = svg.selectAll('circle.node').data(nodes);

circles.enter().append('circle')
    .classed('node', true);

circles
    .attr('r', 5)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });

circles.exit().remove();

var lines = svg.selectAll('line.link').data(links);

lines.enter().append('line')
    .attr('stroke', 'black')
    .classed('link', true);

lines
    .attr('x1', function(d) { return d.source.x; })
    .attr('x2', function(d) { return d.target.x; })
    .attr('y1', function(d) { return d.source.y; })
    .attr('y2', function(d) { return d.target.y; });

lines.exit().remove();
</div>
<script>codeBlock().editor('#code-a05').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a01"></div>
</div>

### Animando el Force Layout

El force layout calcula las posiciones simulando la fuerza en una serie de ticks. En cada tick, se evalua la posición de cada nodo, se calcula la fuerza que se debe aplicar en cada uno, se aplica la fuerza y se configura la nueva posición y nueva velocidad.

Podemos actualizar el gráfico en cada tick, para ver cómo evoluciona la posición.

<div class="runnable" id="code-a06">
var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-500)
    .gravity(0.1)
    .size([width, height]);

var div = d3.select('#ejemplo-a02'),
    svg = div.selectAll('svg').data([nodes]);

svg.enter().append('svg');

svg.attr('width', width).attr('height', height);

var circles = svg.selectAll('circle.node').data(nodes);

circles.enter().append('circle')
    .attr('r', 5)
    .classed('node', true)
    .call(force.drag);

circles.exit().remove();

var lines = svg.selectAll('line.link').data(links);

lines.enter().append('line')
    .attr('stroke', 'black')
    .classed('link', true);

force.on('tick', function() {
    circles
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });

    lines
        .attr('x1', function(d) { return d.source.x; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('y2', function(d) { return d.target.y; });
});
</div>
<script>codeBlock().editor('#code-a06').init();</script>

<div class="runnable" id="code-a07">
force.start();
</div>
<script>codeBlock().editor('#code-a07').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a02"></div>
</div>

### Ejemplo

Red social de delfines

<div class="runnable" id="code-b01">
var graph;
d3.json('/assets/data/dolphins.json', function(error, data) {

   if (error) { console.error(error); }

    graph = data;
});
</div>
<script>codeBlock().editor('#code-b01').init();</script>

Parámetros del gráfico

<div class="runnable" id="code-b02">
var width  = 600,
    height = 600;

var force = d3.layout.force()
    .nodes(graph.nodes)
    .links(graph.links)
    .charge(-300)
    .size([width, height]);
</div>
<script>codeBlock().editor('#code-b02').init();</script>

Creamos los elementos del gráfico

<div class="runnable" id="code-b03">
var div = d3.select('#ejemplo-b01'),
    svg = div.selectAll('svg').data([graph]);

svg.enter().append('svg');

svg.attr('width', width).attr('height', height);

var circles = svg.selectAll('circle.node').data(graph.nodes);

circles.enter().append('circle')
    .attr('r', 5)
    .classed('node', true)
    .call(force.drag);

circles.exit().remove();

var lines = svg.selectAll('line.link').data(graph.links);

lines.enter().append('line')
    .attr('stroke', 'black')
    .classed('link', true);

force.on('tick', function() {
    circles
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });

    lines
        .attr('x1', function(d) { return d.source.x; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('y2', function(d) { return d.target.y; });
});

force.start();
</div>
<script>codeBlock().editor('#code-b03').init();</script>

<div class="ejemplo">
    <div id="ejemplo-b01"></div>
</div>
