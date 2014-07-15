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

<div>
    <style type="text/css">
        .node {
            fill: #aaa;
            stroke: #555;
            stroke-width: 2;
        }

        .link {
            stroke: #5555aa;
            stroke-opacity: 0.8;
            stroke-width: 2;
        }

        .label {
            font-size: 8px;
            fill: #444477;
        }
    </style>
</div>

Algunos conjuntos de datos representan relaciones: la estructura de los datos está compuesta de _nodos_ que representan entidades y _links_ que representan relaciones entre las entidades. Por ejemplo,

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

El _force layout_ está especialmente diseñado para datos que representan relaciones. Simula una fuerza repulsiva entre los nodos. Con los parámetros adecuados, permite dibujar elemenos sin que se traslapen demasiado.

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

El force layout calcula posiciones óptimas para los nodos usando la simulación de fuerzas. Para que empiece el cálculo, hay que invocar el método `start()`.

<div class="runnable" id="code-a03">
force.start();
</div>
<script>codeBlock().editor('#code-a03').init();</script>

El force layout extiende los nodos: ahora tienen index, posición, peso y momentum. Por ejemplo, examinando el nodo **A**:

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

Ahora tenemos un arreglo de elementos que podemos graficar como antes:

<div class="ejemplo">
    <div id="ejemplo-a01"></div>
</div>

<div class="runnable" id="code-a05">
//Seleccionamos el div y creamos el SVG
var div = d3.select('#ejemplo-a01'),
    svg = div.selectAll('svg').data([nodes]);

svg.enter().append('svg');

svg.attr('width', width).attr('height', height);

svg.exit().remove();

//Creamos los links
var lines = svg.selectAll('line.link').data(links);

lines.enter().append('line')
    .classed('link', true);

lines
    .attr('x1', function(d) { return d.source.x; })
    .attr('x2', function(d) { return d.target.x; })
    .attr('y1', function(d) { return d.source.y; })
    .attr('y2', function(d) { return d.target.y; });

lines.exit().remove();

//Creamos los círculos
var circles = svg.selectAll('circle.node').data(nodes);

circles.enter().append('circle')
    .classed('node', true);

circles
    .attr('r', 5)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });

circles.exit().remove();
</div>
<script>codeBlock().editor('#code-a05').init();</script>



### Animando el Force Layout

El force layout permite crear gráficos que responden ante perturbaciones de alguno de los nodos:
el force layout puede volver a calcular las posiciones en una serie de ticks. En cada tick, se evalúa la posición de cada nodo, se calcula la fuerza que resulta de la nueva configuración, se aplica la fuerza a los nodos y se configura la nueva posición y la nueva velocidad.

En la práctica, actualizamos el gráfico en cada tick para que se actualice la posición.

<div class="runnable" id="code-a06">
//Configuramos el layout
var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-500)
    .gravity(0.1)
    .size([width, height]);

//Seleccionamos el div y creamos el SVG
var div = d3.select('#ejemplo-a02'),
    svg = div.selectAll('svg').data([nodes]);

svg.enter().append('svg');

svg.attr('width', width).attr('height', height);

svg.exit().remove();

//Creamos los links
var lines = svg.selectAll('line.link').data(links);

lines.enter().append('line')
    .classed('link', true);

lines.exit().remove();

//Creamos los círculos
var circles = svg.selectAll('circle.node').data(nodes);

circles.enter().append('circle')
    .attr('r', 5)
    .classed('node', true)
    .call(force.drag);

circles.exit().remove();

//Específicamos el comportamiento en los ticks
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

### Ejemplo: red social de delfines

Usaremos el force layout para graficar una red social de delfines. Cargamos los datos:

<div class="runnable" id="code-b01">
var graph;
d3.json('/assets/data/dolphins.json', function(error, data) {

   if (error) { console.error(error); }

    graph = data;
});
</div>
<script>codeBlock().editor('#code-b01').init();</script>

Definimos los parámetros del gráfico y creamos el layout:

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

Finalmente, creamos los elementos del gráfico:

<div class="ejemplo">
    <div id="ejemplo-b01"></div>
</div>

<div class="runnable" id="code-b03">
var div = d3.select('#ejemplo-b01'),
    svg = div.selectAll('svg').data([graph]);

svg.enter().append('svg');

svg.attr('width', width).attr('height', height);

var lines = svg.selectAll('line.link').data(graph.links);

lines.enter().append('line')
    .classed('link', true);

lines.exit().remove();

var labels = svg.selectAll('text.label').data(graph.nodes);

labels.enter().append('text')
    .classed('label', true);

labels.exit().remove();

var circles = svg.selectAll('circle.node').data(graph.nodes);

circles.enter().append('circle')
    .attr('r', 5)
    .classed('node', true)
    .call(force.drag);

circles.exit().remove();

force.on('tick', function() {
    circles
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });

    labels
        .attr('x', function(d) { return d.x + 10; })
        .attr('y', function(d) { return d.y; })
        .text(function(d) { return d.label; });

    lines
        .attr('x1', function(d) { return d.source.x; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('y2', function(d) { return d.target.y; });
});

force.start();
</div>
<script>codeBlock().editor('#code-b03').init();</script>

El force layout se puede usar para representar redes bastante complejas. Sin embargo, la generación y actualización del gráfico se vuelve rápidamente muy costosa.


