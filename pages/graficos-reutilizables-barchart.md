---
layout: seccion
title: Nuevo Gráfico de Barras
parent:
    url: pages/graficos-reutilizables.html
    title: Gráficos Reutilizables
prev:
    url: pages/graficos-reutilizables-ejemplo.html
    title: Usando el Scatter Plot
next:
    url: pages/next.html
    title: Next
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

            .node-highlight{
                fill: #fff;
                cursor: default
            }
    </style>
</div>

Vamos a usar la estructura de gráficos reusables con el código del scatter plot creado antes. Definimos los datos nuevamente.

<div class="runnable" id="code-a01">
var datosA = [
    {nombre: 'Manzana',     color: '#ff0000',  calorias: 52,   grasa: 0.2,  proteinas: 0.3,   azucar: 14},
    {nombre: 'Hamburguesa', color: '#993300',  calorias: 295,  grasa: 14,   proteinas: 17,    azucar: 24},
    {nombre: 'Pizza',       color: '#cc9900',  calorias: 266,  grasa: 10,   proteinas: 11,    azucar: 33},
    {nombre: 'Palta',       color: '#004400',  calorias: 160,  grasa: 15,   proteinas:  2,    azucar: 9},
    {nombre:'Platano',      color:'#ffcc00',   calorias: 89,   grasa: 0.3,  proteinas: 1.1,   azucar: 23},
    {nombre:'Nuez',         color:'#cc6600',   calorias: 576,  grasa: 49,   proteinas: 21,    azucar: 22},
    {nombre:'Almendra',     color:'#660033',   calorias: 576,  grasa: 49,   proteinas: 21,    azucar: 22},
    {nombre:'Pollo',        color:'#cc9900',   calorias: 219,  grasa: 12,   proteinas: 27,    azucar: 0},
    {nombre:'Pavo',         color:'#ffcc33',   calorias: 111,  grasa: 0.7,  proteinas: 25,    azucar: 0.1},
    {nombre:'Baggel',       color:'#cc9966',   calorias: 250,  grasa: 1.5,  proteinas: 10,    azucar: 49},
    {nombre:'Brocoli',      color:'#00bb00',   calorias: 34,   grasa: 0.4,  proteinas: 2.8,   azucar: 7},
    {nombre:'Pan',          color:'#cc6633',   calorias: 289,  grasa: 1.8,  proteinas: 12,    azucar: 56},
    {nombre:'Papas fritas', color:'#ffcc00',   calorias: 536,  grasa: 35,   proteinas: 7,     azucar: 53},
    {nombre:'Vino',         color:'#660066',   calorias: 83,   grasa: 0,    proteinas: 0.1,   azucar: 2.7},
    {nombre:'Uva',          color:'#66cc66',   calorias: 67,   grasa: 0.4,  proteinas: 0.6,   azucar: 17},
    {nombre:'Granola',      color:'#ff9900',   calorias: 471,  grasa: 20,   proteinas: 10,    azucar: 64},
    {nombre:'Zanahoria',    color:'#ff3300',   calorias: 41,   grasa: 0.2,  proteinas: 0.9,   azucar: 10},
    {nombre:'Tomate',       color:'#ff0000',   calorias: 18,   grasa: 3.9,  proteinas: 0.9,   azucar: 3.9},
    {nombre:'Naranja',      color:'#ff6600',   calorias: 47,   grasa: 0.1,  proteinas: 0.9,   azucar: 12},
    {nombre:'Pera',         color:'#00ff00',   calorias: 57,   grasa: 0.1,  proteinas: 0.4,   azucar: 15},
    {nombre:'Nutella',      color:'#550000',   calorias: 500,  grasa: 27,   proteinas: 5,     azucar: 50},
    {nombre:'Arroz',        color:'#ffffcc',   calorias: 111,  grasa: 0.9,  proteinas: 2.6,   azucar: 23},
    {nombre:'Chocolate',    color:'#330000',   calorias: 546,  grasa: 31,   proteinas: 4.9,   azucar: 61},
    {nombre:'Rabano',       color:'#cc0033',   calorias: 16,   grasa: 0.1,  proteinas: 0.7,   azucar: 3.4},
    {nombre:'Soya',         color:'#004400',   calorias: 446,  grasa: 20,   proteinas: 36,    azucar: 30},
    {nombre:'Aceite',       color:'#007700',   calorias: 884,  grasa: 100,  proteinas: 0,     azucar: 0},
    {nombre:'Leche',        color:'#eeeeee',   calorias: 42,   grasa: 1,    proteinas: 3.4,   azucar: 5},
    {nombre:'Queso',        color:'#ffff00',   calorias: 371,  grasa: 32,   proteinas: 18,    azucar: 3.7},
    {nombre:'Pan Pita',     color:'#660033',   calorias: 275,  grasa: 1.2,  proteinas: 9,     azucar: 56},
    {nombre:'Vacuno',       color:'#660000',   calorias: 250,  grasa: 15,   proteinas: 26,    azucar: 0},
    {nombre:'Zapayo',       color:'#ff6600',   calorias: 26,   grasa: 0.1,   proteinas: 1,    azucar: 6},
    {nombre:'Piña',         color:'#ffff99',   calorias: 50,   grasa: 0.1,   proteinas: 0.5,  azucar: 13},
    {nombre:'Coco',         color:'#ffffcc',   calorias: 354,  grasa: 33,    proteinas: 3.3,  azucar: 15}
];
</div>
<script>codeBlock().editor('#code-a01').init();</script>

Creamos la estructura básica de los gráficos reutilizables.

<div class="runnable" id="code-a02">
function scatterChart() {

    // Atributos del grafico
    var width  = 600,
        height = 400;

    // Creación y actualización del grafico
    function chart(selection) {
        selection.each(function(data) {

        });
    }

    // Funciones de configuración

    chart.width = function(newWidth) {
        if (!arguments.length) { return width; }
        width = newWidth;
        return chart;
    };

    return chart;
}
</div>
<script>codeBlock().editor('#code-a02').init();</script>

Ahora, agregamos los valores de configuración al gráfico y reemplazamos el contenido de la función `chart` con el código de creación del scatter plot.

<div class="runnable" id="code-a03">
function scatterChart() {

    // Atributos por defecto del gráfico
    var width     = 800,
        height    = 300,
        margin    = {top: 30, right: 20, bottom: 20, left: 40},
        maxRadius = 20,
        duration  = 1e3,
        x         = function(d) { return d.x; },
        y         = function(d) { return d.y; },
        r         = function(d) { return d.z; };

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
                .attr('fill', function(d) {return d.color})
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

    return chart;
}
</div>
<script>codeBlock().editor('#code-a03').init();</script>

### Usando el gráfico


<div class="runnable" id="code-a04">
    var scatter = scatterChart()
        .x(function(d) { return d.calorias; })
        .y(function(d) { return d.proteinas; })
        .r(function(d) { return d.grasa; })
        .width(300)
        .height(200);

    d3.select('#ejemplo-a04')
        .data([datosA])
        .call(scatter);
</div>
<script>codeBlock().editor('#code-a04').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a04"></div>
</div>

y podemos hacer update

<div class="runnable" id="code-a05">
    var scatter = scatterChart()
        .x(function(d) { return d.grasa; })
        .y(function(d) { return d.proteinas; })
        .r(function(d) { return d.calorias; })
        .width(600)
        .height(150);

    d3.select('#ejemplo-a04')
        .data([datosA])
        .call(scatter);
</div>
<script>codeBlock().editor('#code-a05').init();</script>

