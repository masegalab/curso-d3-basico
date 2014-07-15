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

<div>
    <style>
            .eje path, line {
                fill: none;
                stroke: black;
                stroke-width: 1px;
            }

            .eje text {
                fill: black;
                font-size: 11px;
            }
    </style>
</div>

En esta sección presentaremos el layout para crear histogramas.
Primero, cargamos los datos usando d3.json (recuerde que es asíncrono):

<div class="runnable" id="code-a01">
var datos;
d3.json('/assets/data/food.json', function(error, data) {

    if (error) { console.error(error); }

    datos = data;
});
</div>
<script>codeBlock().editor('#code-a01').init();</script>

Definimos los parámetros del gráfico y la función de acceso:

<div class="runnable" id="code-a02">
var marginBottom = 40,
    marginLeft = 20,
    width  = 800 - marginLeft,
    height = 600 - marginBottom;

var value = function(d) { return d.calorias; }
</div>
<script>codeBlock().editor('#code-a02').init();</script>

Creamos el histogram layout. Observe que el layout necesita conocer la escala de x:

<div class="runnable" id="code-a03">
//Escala en x
var xScale = d3.scale.linear()
    .domain([0,d3.max(datos, value)])
    .range([0,width]);

//Layout
var histLayout = d3.layout.histogram()
    .bins(xScale.ticks(40))
    .value(value);
</div>
<script>codeBlock().editor('#code-a03').init();</script>

Hemos definido la cantidad de 'bins', esto es, en la práctica, la cantidad de barras que tendrá nuestro histograma. En este caso, estamos particionando el dominio de nuestra escala en 40 intervalos disjuntos de misma longitud. Recuerde que, en el histograma, la altura de las barras representa la cantidad de valores que caen en cada uno de estos intervalos. Esto es distinto de un gráfico de barra en el que se grafica alguna observable asociada a un conjunto de entidades.

La variable 'histLayout' es una función. Cuando aplicamos 'histLayout' a nuestros datos, se calcula, entre otras cosas, la posición en la que dibujaremos las barras y la cantidad de valores que caen dentro de cada intervalo. Después de ejecutar el siguiente código, observe la variable 'hist' en la consola. 
<div class="runnable" id="code-a04">
var hist = histLayout(datos);
</div>
<script>codeBlock().editor('#code-a04').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a01"></div>
</div>

Finalmente, graficamos el histograma:

<div class="runnable" id="code-a05">
//Escala en y
var yScale = d3.scale.linear()
    .domain([0, d3.max(hist, function (d) { return d.y; })])
    .range([0,height]);

//Creando svg
var svg = d3.select('#ejemplo-a01').selectAll('svg').data([hist]);

svg.enter().append('svg');

svg
    .attr('width', width + marginLeft)
    .attr('height', height + marginBottom);

//Definimos el eje x
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

svg.append("g")
    .attr("class", "eje")
    .attr("transform", "translate(" + marginLeft + "," + (height + 1) + ")")
    .call(xAxis);

// Creamos un grupo para cada barra
var gBars = svg.selectAll('g.bar').data(hist);

gBars.enter().append('g')
    .classed('bar', true);

//Trasladamos los grupos
gBars.attr('transform', function(d) {
    return 'translate(' + ( marginLeft + xScale(d.x) ) + ', ' + 0 + ')';
});

gBars.exit().remove();

//Creamos las barras
var rects = gBars.selectAll('rect.bar').data(function(d) { return [d]; });

rects.enter().append('rect')
    .classed('bar', true)
    .attr('fill', 'blue')
    .attr('x', 1)
    .attr('y', height)
    .attr('width', xScale(hist[0].dx) - 1)
    .attr('height', 0);

rects.transition().duration(2000)
    .attr('y', function(d) { return height - yScale(d.y)}) //Observe el posicionamiento de la barra 
    .attr('height', function (d) { return yScale(d.y)})
    .attr('width', xScale(hist[0].dx) - 1);

rects.exit().remove();

</div>
<script>codeBlock().editor('#code-a05').init();</script>
