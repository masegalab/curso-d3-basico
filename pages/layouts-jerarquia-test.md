---
layout: seccion
title: Layouts Jerárquicos
parent:
    url: pages/layouts.html
    title: Layouts
prev:
    url: pages/layouts-histogram.html
    title: Histograma
next:
    url: pages/layouts-relaciones.html
    title: Redes
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


Los layouts jerárquicos se usan para representar datos que tienen una estructura anidada o, dicho de otro modo, datos para los cuales existe alguna jerarquía intrínseca. El caso más simple es el árbol, que tiene una raíz que tiene hijos, cada uno de los cuales puede tener hijos a su vez, y así sucesivamente. 

El siguiente ejemplo tiene una estructura de árbol: la raíz es América, que tiene como hijos América del Sur, América Central y América del Sur. Estos hijos a su vez tienen hijos (que en este caso son países):

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

El _layout cluster_ transforma datos de estructura anidada en una estructura más apropiada para graficarlos de un modo que refleje la jerarquía de los datos. 

La función cluster nos entrega una nueva representacíon de los datos: cada entidad se representa como un elemento de dato individual, o _nodo_, con referencia a su padre y a sus hijos. Por otro lado, los _links_ contienen la información de la conectividad entre distintos nodos.

Después de ejecutar el siguiente código, explore las variables ´nodes´ y ´links´ en la consola.

<div class="runnable" id="code-a02">
var width  = 800,
    height = 600,
    padding = 150;

var cluster = d3.layout.cluster()
    .size([height, width - 2 * padding]);

var nodes = cluster.nodes(root),
    links = cluster.links(nodes);
</div>
<script>codeBlock().editor('#code-a02').init();</script>

Observe que los nodos tiene información de posición. Esta puede ser utilizada para dibujar nuestro gráfico. Cada nodo será representado por un círculo.

<div class="ejemplo">
    <div id="ejemplo-a01"></div>
</div>

<div class="runnable" id="code-a03">
//Seleccionamos el div y creamos un SVG
var div = d3.select('#ejemplo-a01'),
    svg = div.selectAll('svg').data([nodes]);

svg.enter().append('svg');

svg
    .attr('width', width)
    .attr('height', height);

svg.exit().remove();

gChart = svg.selectAll('g.chart').data([nodes]);

gChart.enter().append('g').classed('chart', true);

gChart.attr('transform', 'translate(' + padding + ', ' + 0 + ')');

gChart.exit().remove();

//Creamos los links
var lines = gChart.selectAll('line.link').data(links);

lines.enter().append('line')
    .classed('link', true);

lines
    .attr('stroke', 'grey')
    .attr('stroke-opacity', 0.6)
    .attr('x1', function(d) { return d.source.y; })
    .attr('x2', function(d) { return d.target.y; })
    .attr('y1', function(d) { return d.source.x; })
    .attr('y2', function(d) { return d.target.x; });

lines.exit().remove();

//Creamos los círculos
var circles = gChart.selectAll('circle.nodes').data(nodes);

circles.enter().append('circle')
    .classed('nodes', true);

circles
    .attr('cx', function(d) { return d.y; })
    .attr('cy', function(d) { return d.x; })
    .attr('r', 4);

circles.exit().remove();


//Creamos las etiquetas
var labels = gChart.selectAll('text.label').data(nodes);

labels.enter().append('text')
    .classed('label', true);

labels
    .attr('x', function(d) { return d.children ? d.y - 10 : d.y + 10; })
    .attr('y', function(d) { return d.x; })
    .attr('text-anchor', function(d) { return d.children ? 'end' : 'start'; })
    .text(function(d) { return d.name; });

labels.exit().remove();
</div>
<script>codeBlock().editor('#code-a03').init();</script>



Este layout permite generar otros tipos de gráficos, por ejemplo, distribuyendo los nodos radialmente:

<div class="ejemplo">
    <div id="ejemplo-a02"></div>
</div>

<div class="runnable" id="code-a04">
var radius = 400
    padding = 10;

//Configuramos el layout y lo aplicamos a nuestros datos
var cluster = d3.layout.cluster()
    .size([2 * Math.PI, radius - 2*padding]);

var nodes = cluster.nodes(root),
    links = cluster.links(nodes);

//Seleccionamos el div y creamos el SVG
var div = d3.select('#ejemplo-a02'),
    svg = div.selectAll('svg').data([root]);

svg.enter().append('svg');

svg
    .attr('width', 2 * radius)
    .attr('height', 2 * radius);

svg.exit().remove();

gChart = svg.selectAll('g.chart').data([nodes]);

gChart.enter().append('g').classed('chart', true);

gChart.attr('transform', 'translate(' + padding +', ' + padding +')');

gChart.exit().remove();

//Creamos los links
var lines = gChart.selectAll('line.link').data(links);

lines.enter().append('line')
    .classed('link', true);

lines
    .attr('stroke', 'grey')
    .attr('stroke-opacity', 0.6)
    .attr('x1', function(d) { return radius + d.source.y * Math.cos(d.source.x); })
    .attr('x2', function(d) { return radius + d.target.y * Math.cos(d.target.x); })
    .attr('y1', function(d) { return radius + d.source.y * Math.sin(d.source.x); })
    .attr('y2', function(d) { return radius + d.target.y * Math.sin(d.target.x); });

lines.exit().remove();

//Creamos los círculos
var circles = gChart.selectAll('circle.nodes').data(nodes);

circles.enter().append('circle')
    .classed('nodes', true);

circles
    .attr('cx', function(d) { return radius + d.y * Math.cos(d.x); })
    .attr('cy', function(d) { return radius + d.y * Math.sin(d.x); })
    .attr('r', 4);

circles.exit().remove();

//Creamos las etiquetas
var labels = gChart.selectAll('text.label').data(nodes);

labels.enter().append('text')
    .classed('label', true);

labels
    .attr('x', function(d) { return radius + d.y * Math.cos(d.x) + 10; })
    .attr('y', function(d) { return radius + d.y * Math.sin(d.x); })
    .text(function(d) { return d.name; });

labels.exit().remove();
</div>
<script>codeBlock().editor('#code-a04').init();</script>

El cálculo de la posición de los links involucra un poco de trigonometría, pero es bastante estándar. Es fácil modificar el código para repartir los nodos en un semi-círculo.


### Pack

El _pack layout_ nos permite representar la estructura de árbol de un modo distinto. Ahora, los nodos serán representado por burbujas contenidas en la burbuja correspondiente al padre respectivo.

<div class="ejemplo">
    <div id="ejemplo-b01"></div>
</div>

<div class="runnable" id="code-b01">
var diameter = 400;

//Configuramos el layout y lo aplicamos a nuestros datos
var pack = d3.layout.pack()
    .size([diameter - 4, diameter - 4])
    .value(function(d) { return d.poblacion; });

var packItems = pack(root);

//Seleccionamos el div y creamos el SVG
var div = d3.select('#ejemplo-b01'),
    svg = div.selectAll('svg').data([root]);

svg.enter().append('svg');

svg
    .attr('width', diameter)
    .attr('height', diameter);

svg.exit().remove();

//Creamos las burbujas
var bubbles = svg.selectAll('circle.pack').data(packItems);

bubbles.enter().append('circle')
    .classed('pack', true);

bubbles
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r',  function(d) { return d.r; });

bubbles.exit().remove();

//Creamos las etiquetas
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



