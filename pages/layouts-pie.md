---
layout: seccion
title: Pie Layout
parent:
    url: pages/layouts.html
    title: Layouts
prev:
    url: pages/layouts-datos-externos.html
    title: Datos Externos
next:
    url: pages/layouts-histogram.html
    title: Histograma
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

Los layout son funciones que transforman datos de una representación a otra, usualmente para que sea más fácil generar cierto tipo de gráficos. No tienen una representación visual intrínseca, sólo son transformaciones en los datos.

Para crear un _donut chart_ o un _pie chart_, necesitamos un conjunto de datos categóricos con una variable cuantitativa, donde cada ítem representará una parte del total.

<div class="runnable" id="code-b01">
var desayuno = [
    {item: 'Café Latte', precio: 1800, calorias: 110},
    {item: 'Sandwich',   precio: 2500, calorias: 295},
    {item: 'Manzana',    precio:  500, calorias:  52}
];
</div>
<script>codeBlock().editor('#code-b01').init();</script>

Para generar un pie chart a partir de estos datos, necesitaría calcular los porcentajes correspondientes a cada ítem, el ángulo que corresponde a ese porcentaje, y luego sumar acumulativamente los ángulos. Afortunadamente, los _layouts_ de D3 son funciones que hacen estos cálculos por nosotros.

<div class="runnable" id="code-b02">
// Configuración del Pie Layout
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
        precio:   1800,
        calorias: 110
    },
    value:      1800,
    startAngle: 3.653014713476504,
    endAngle:   5.5525823644842855
};
</div>
<script>codeBlock().editor('#code-b03').init();</script>

La nueva representación nos permite generar rápidamente un _donut chart_.

### Generadores SVG

Los elementos de una imagen SVG son una descripción de cómo dibujarlos. Por ejemplo, para crear un círculo, sólo necesitamos escribir el markup del elemento: `<circle cx='10' cy='10' r='5'></circle>`. Esto funciona bien para elementos simples, para elementos más complejos como líneas curvas, arcos o mapas, necesitaremos usar el elemento `path`.

Un `path` es un elemento que contiene un string que describe una forma como una serie de movimientos de un cursor, usando un mini-lenguaje diseñado para esto. Por ejemplo, para dibujar un arco, el atributo `d` del path sería:

`d="M-73.41267717166284,130.80741122157113A150,150 0 0,...,43.60247040719038Z"`.

<div class="ejemplo">
<svg width=600 height=300>
    <g transform="translate(300, 150)">
        <path d="M-73.41267717166284,130.80741122157113A150,150 0 0,1 -100.09782168333587,-111.71582741156718L-33.365940561111955,-37.23860913718906A50,50 0 0,0 -24.47089239055428,43.60247040719038Z" fill="#fa0000"></path>
    </g>
</svg>
</div>

No necesitamos escribir el string que describe el path manualmente, D3 provee funciones reutilizables que calculan el string para distintas formas. Estas funciones usan la estructura de los gráficos reutilizables, y asumen que los datos tienen cierta estructura.

#### Arc Generator

Para generar un segmento angular, necesitamos configurar la función `d3.svg.arc` entregándole un radio interno y un radio externo. La variable `arc` es una función que toma un objeto que tenga los atributos `startAngle` y `endAngle` y retorna el string que representa el segmento angular.

<div class="runnable" id="code-b04">
// Configuramos el generador de arcos
var arc = d3.svg.arc()
    .innerRadius(80)
    .outerRadius(140);

// Calculamos el string que representa el segmento angular
var arcPath = arc(arcItem);
</div>
<script>codeBlock().editor('#code-b04').init();</script>

Este generador se puede usar junto al _pie layout_ para crear un _donut chart_.

<div class="ejemplo">
    <div id="ejemplo-b01"></div>
</div>

<div class="ejemplo">
    <div id="ejemplo-b01"></div>
</div>

<div class="runnable" id="code-b05">
// Creamos el contenedor SVG
var div = d3.select('#ejemplo-b01'),
    svg = div.selectAll('svg').data([pieData]);

svg.enter().append('svg');

svg
    .attr('width',  300)
    .attr('height', 300);

svg.exit().remove();

// Creamos un grupo para trasladar el punto de referencia de los arcos
var gPie = svg.selectAll('g.donut-chart').data([pieData]);

gPie.enter().append('g')
    .classed('donut-chart', true);

gPie.attr('transform', 'translate(150, 150)');

gPie.exit().remove();

// Agregamos los paths para cada arco
var arcPaths = gPie.selectAll('path.arc').data(pieData);

arcPaths.enter().append('path')
    .classed('arc', true);

// arcPaths.attr('d', arc);
arcPaths.attr('d', function(d) { return arc(d); });

arcPaths.exit().remove();
</div>
<script>codeBlock().editor('#code-b05').init();</script>

### Pie Chart Reutilizable

Ahora que sabemos crear un donut chart, podemos crear un gráfico reutilizable para crear donut charts y pie charts.

<div class="runnable" id="code-b06">
function donutChart() {

    var me = {
        width:  400,
        height: 400,
        outerRadius: 180,
        innerRadius: 130,
        value: function(d) { return d.value; },
        color: function(d, i) { return d.color; },
        label: function(d) { return ''; }
    };

    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]);

            svg.enter().append('svg');

            svg
                .attr('width',  me.width)
                .attr('height', me.height);

            svg.exit().remove();

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

            var arcLabels = gChart.selectAll('text.label').data(pieData);

            arcLabels.enter().append('text')
                .classed('label', true);

            var labelR = 1.2 * me.outerRadius;

            arcLabels
                .attr('x', function(d) { return labelR * Math.cos(0.5 * (-Math.PI + d.startAngle + d.endAngle)); })
                .attr('y', function(d) { return labelR * Math.sin(0.5 * (-Math.PI + d.startAngle + d.endAngle)); })
                .text(function(d) { return me.label(d.data); });

            arcLabels.exit().remove();
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

    chart.label = function(labelAccessor) {
        if (!arguments.length) { return me.label; }
        me.label = labelAccessor;
        return chart;
    };

    return chart;
}
</div>
<script>codeBlock().editor('#code-b06').init();</script>

Usando los mismos datos que antes, configuramos el gráfico, hacemos data binding e invocamos el gráfico.


<div class="ejemplo">
    <div id="ejemplo-b02"></div>
</div>

<div class="runnable" id="code-b07">
// Define la escala de colores
var colorScale = d3.scale.category10()
    .domain(d3.range(desayuno.lenght));

// Configuramos el gráfico
var donut = donutChart()
    .innerRadius(0)
    .outerRadius(100)
    .value(function(d) { return d.precio; })
    .label(function(d) { return d.item; })
    .color(function(d, i) { return colorScale(i); });

// Data binding y rendering
d3.select('#ejemplo-b02')
    .data([desayuno])
    .call(donut);
</div>
<script>codeBlock().editor('#code-b07').init();</script>

### Transiciones

<div class="ejemplo">
    <div class="btn-group btn-group-sm">
        <button id="boton-p" type="button" class="btn btn-default btn-sm">Precio</button>
        <button id="boton-c" type="button" class="btn btn-default btn-sm">Calorias</button>
    </div>
    <div id="ejemplo-b03"></div>
</div>

<div class="runnable" id="code-b08">

d3.select('#boton-p').on('click', function() {

    donut.value(function(d) { return d.precio; });

    d3.select('#ejemplo-b03')
        .data([desayuno])
        .call(donut);
});

d3.select('#boton-c').on('click', function() {

    donut.value(function(d) { return d.calorias; });

    d3.select('#ejemplo-b03')
        .data([desayuno])
        .call(donut);
});

// Data binding y rendering
d3.select('#ejemplo-b03')
    .data([desayuno])
    .call(donut);
</div>
<script>codeBlock().editor('#code-b08').init();</script>

La transición no es suave como en otros ejemplos.

<div class="runnable" id="code-b09">
function donutChart() {

    var me = {
        width:  400,
        height: 400,
        outerRadius: 180,
        innerRadius: 130,
        value: function(d) { return d.value; },
        color: function(d, i) { return d.color; },
        label: function(d) { return ''; }
    };

    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]);

            svg.enter().append('svg');

            svg
                .attr('width',  me.width)
                .attr('height', me.height);

            svg.exit().remove();

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

            function arcTween(a) {
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function(t) {
                    return arcGenerator(i(t));
                };
            }

            var arcPaths = gChart.selectAll('path.arco').data(pieData);

            arcPaths.enter().append('path')
                .classed('arco', true)
                .each(function(d) { this._current = d; });

            arcPaths.transition().duration(1000)
                .attrTween('d', arcTween)
                .attr('fill', function(d, i) { return me.color(d, i); });

            arcPaths.exit().remove();

            var arcLabels = gChart.selectAll('text.label').data(pieData);

            arcLabels.enter().append('text')
                .classed('label', true);

            var labelR = 1.2 * me.outerRadius;

            arcLabels
                .attr('x', function(d) { return labelR * Math.cos(0.5 * (-Math.PI + d.startAngle + d.endAngle)); })
                .attr('y', function(d) { return labelR * Math.sin(0.5 * (-Math.PI + d.startAngle + d.endAngle)); })
                .text(function(d) { return me.label(d.data); });

            arcLabels.exit().remove();
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

    chart.label = function(labelAccessor) {
        if (!arguments.length) { return me.label; }
        me.label = labelAccessor;
        return chart;
    };

    return chart;
}
</div>
<script>codeBlock().editor('#code-b09').init();</script>

<div class="ejemplo">
    <div class="btn-group btn-group-sm">
        <button id="boton-p4" type="button" class="btn btn-default btn-sm">Precio</button>
        <button id="boton-c4" type="button" class="btn btn-default btn-sm">Calorias</button>
    </div>
    <div id="ejemplo-b04"></div>
</div>

<div class="runnable" id="code-b10">
// Configuramos el gráfico
var newDonut = donutChart()
    .innerRadius(80)
    .outerRadius(100)
    .value(function(d) { return d.precio; })
    .color(function(d, i) { return colorScale(i); });

d3.select('#ejemplo-b04')
    .data([desayuno])
    .call(newDonut);

d3.select('#boton-p4').on('click', function() {

    newDonut.value(function(d) { return d.precio; });

    d3.select('#ejemplo-b04')
        .data([desayuno])
        .call(newDonut);
});

d3.select('#boton-c4').on('click', function() {

    newDonut.value(function(d) { return d.calorias; });

    d3.select('#ejemplo-b04')
        .data([desayuno])
        .call(newDonut);
});
</div>
<script>codeBlock().editor('#code-b10').init();</script>

