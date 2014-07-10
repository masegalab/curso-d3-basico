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

            .label {
                font-size: 11px;
            }

            .bars {
                fill: #204a87;
                fill-opacity: 0.5;
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

Creamos la estructura básica de los gráficos reutilizables, para crear el gráfico de barras

<div class="runnable" id="code-a02">
function barChart() {

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
</div>
<script>codeBlock().editor('#code-a03').init();</script>

### Usando el gráfico


<div class="runnable" id="code-a04">
    var barchart = barChart()
        .x(function(d) { return d.calorias; })
        .label(function(d) { return d.nombre.toUpperCase(); })
        .margin({top: 10, right: 10, bottom: 30, left: 100})
        .width(800)
        .height(600);

    d3.select('#ejemplo-a04')
        .data([datosA])
        .call(barchart);
</div>
<script>codeBlock().editor('#code-a04').init();</script>

<div class="ejemplo">
    <div class="btn-group btn-group-sm">
        <button id="boton-g" type="button" class="btn btn-default btn-sm">Grasa</button>
        <button id="boton-p" type="button" class="btn btn-default btn-sm">Proteinas</button>
        <button id="boton-a" type="button" class="btn btn-default btn-sm">Azúcar</button>
        <button id="boton-c" type="button" class="btn btn-default btn-sm">Calorías</button>
    </div>
    <div id="ejemplo-a04"></div>
</div>

<div class="runnable" id="code-a05">
    d3.select('#boton-g').on('click', function() {

        barchart.x(function(d) { return d.grasa; });

        d3.select('#ejemplo-a04')
            .data([datosA])
            .call(barchart);
    });

    d3.select('#boton-p').on('click', function() {

        barchart.x(function(d) { return d.proteinas; });

        d3.select('#ejemplo-a04')
            .data([datosA])
            .call(barchart);
    });

    d3.select('#boton-a').on('click', function() {

        barchart.x(function(d) { return d.azucar; });

        d3.select('#ejemplo-a04')
            .data([datosA])
            .call(barchart);
    });

    d3.select('#boton-c').on('click', function() {

        barchart.x(function(d) { return d.calorias; });

        d3.select('#ejemplo-a04')
            .data([datosA])
            .call(barchart);
    });

</div>
<script>codeBlock().editor('#code-a05').init();</script>
