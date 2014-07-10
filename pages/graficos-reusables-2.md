---
layout: seccion
title: Gráficos Reusables II
parent:
    url: pages/graficos-reusables.html
    title: Gráficos Reusables
prev:
    url: pages/graficos-reusables.html
    title: Gráficos Reusables
next:
    url: pages/graficos-reusables-3.html
    title: Gráficos Reusables III
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

**Configuración del Gráfico**

- Datos
- Configuración
- Selección DIV, binding


** Creación del Gráfico**

- Crear SVG y grupos
- Trasladar grupos
- Crear escalas
- Crear ejes
- Crear círculos
    - Binding
    - Enter
    - Update
    - Exit


Vamos a usar el set de datos del ejemplo anterior para crear un tipo de gráfico diferente.

<div class="runnable" id="code-a01">
var datosA = [
    {nombre: 'Manzana',     color: 'red',    calorias:  52, grasa: 0.2, proteinas:  0.3},
    {nombre: 'Hamburguesa', color: 'brown',  calorias: 295, grasa: 14,  proteinas: 17},
    {nombre: 'Pizza',       color: 'yellow', calorias: 266, grasa: 10,  proteinas: 11},
    {nombre: 'Palta',       color: 'green',  calorias: 160, grasa: 15,  proteinas:  2}
];
var datosB = [
    {nombre: 'Manzana',     color: 'red',    calorias:  52, grasa: 0.2, proteinas:  0.3},
    {nombre: 'Hamburguesa', color: 'brown',  calorias: 295, grasa: 14,  proteinas: 17},
    {nombre: 'Pizza',       color: 'yellow', calorias: 266, grasa: 10,  proteinas: 11}
];
var datosC = [
    {nombre: 'Manzana',     color: 'red',    calorias:  52, grasa: 0.2, proteinas:  0.3},
    {nombre: 'Hamburguesa', color: 'brown',  calorias: 295, grasa: 14,  proteinas: 17}
];
</div>
<script>codeBlock().editor('#code-a01').init();</script>

Data Binding

Por ahora nada nuevo

<div class="runnable" id="code-a02">
var divs01 = d3.select('#ejemplo-a01').selectAll('.div-a01').data([datosA, datosB]);
</div>
<script>codeBlock().editor('#code-a02').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a01">
        <div id="ejemplo-a01-1" class="div-a01"></div>
        <div id="ejemplo-a01-2" class="div-a01"></div>
    </div>
</div>

La selección precedente es un arreglo, podemos recorrer el arreglo de elementos y operar sobre cada uno de ellos.

<div class="runnable" id="code-a03">
divs01.each(function(data) {
    var div = d3.select(this);
    console.log(div);
});
</div>
<script>codeBlock().editor('#code-a03').init();</script>

Ahora, con esta sintaxis, tenemos acceso a la selección del div, y a los datos que estan vinculados al div. Como recordarán de la sección precedente, sólo necesitamos eso (más la configuración) para crear un gráfico. Vamos a partir creando un SVG para cada div.

<div class="runnable" id="code-a04">
var divs02 = d3.select('#ejemplo-a02').selectAll('.div-a02').data([datosA, datosB]);

divs02.each(function(data) {
    var div = d3.select(this),
        svg = div.selectAll('svg').data([data]);

    svg.enter().append('svg')
        .attr('width', 200)
        .attr('height', 50);

});
</div>
<script>codeBlock().editor('#code-a04').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a02">
        <div id="ejemplo-a02-1" class="div-a02"></div>
        <div id="ejemplo-a02-2" class="div-a02"></div>
    </div>
</div>

Ahora, en vez de usar una función anónima en `each`, podemos usar una función creada explícitamente, para encapsular la creación de los elementos internos.

<div class="runnable" id="code-a05">
var divs03 = d3.select('#ejemplo-a03').selectAll('.div-a03').data([datosA, datosB]);

function createChartDiv(data) {
    var div = d3.select(this),
            svg = div.selectAll('svg').data([data]);

    svg.enter().append('svg')
        .attr('width', 200)
        .attr('height', 50);
}

divs03.each(createChartDiv);
</div>
<script>codeBlock().editor('#code-a05').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a03">
        <div id="ejemplo-a03-1" class="div-a03"></div>
        <div id="ejemplo-a03-2" class="div-a03"></div>
    </div>
</div>

Pero podemos encapsular un poco mas el asunto

<div class="runnable" id="code-a06">
var divs04 = d3.select('#ejemplo-a04').selectAll('.div-a04').data([datosA, datosB]);

function createChartDiv(data) {
    var div = d3.select(this),
        svg = div.selectAll('svg').data([data]);

    svg.enter().append('svg')
        .attr('width', 200)
        .attr('height', 50);
}

function createCharts(selection) {
    selection.each(createChartDiv);
}

// divs04.call(createCharts);
createCharts(divs04);
</div>
<script>codeBlock().editor('#code-a06').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a04">
        <div id="ejemplo-a04-1" class="div-a04"></div>
        <div id="ejemplo-a04-2" class="div-a04"></div>
    </div>
</div>

Podemos usar la sintaxis `.call`, y tampoco necesitamos nombrar la selección.

<div class="runnable" id="code-a07">
function createChartDiv(data) {
    var div = d3.select(this),
        svg = div.selectAll('svg').data([data]);

    svg.enter().append('svg')
        .attr('width', 200)
        .attr('height', 50);
}

function createCharts(selection) {
    selection.each(createChartDiv);
}

d3.select('#ejemplo-a05').selectAll('.div-a05')
    .data([datosA, datosB])
    .call(createCharts);

</div>
<script>codeBlock().editor('#code-a07').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a05">
        <div id="ejemplo-a05-1" class="div-a05"></div>
        <div id="ejemplo-a05-2" class="div-a05"></div>
    </div>
</div>


<div class="runnable" id="code-a08">
function createCharts(selection) {
    selection.each(function(data) {
        var div = d3.select(this),
            svg = div.selectAll('svg').data([data]);

        svg.enter().append('svg')
            .attr('width', 200)
            .attr('height', 50);
    });
}

d3.select('#ejemplo-a06').selectAll('.div-a06')
    .data([datosA, datosB])
    .call(createCharts);
</div>
<script>codeBlock().editor('#code-a08').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a06">
        <div id="ejemplo-a06-1" class="div-a06"></div>
        <div id="ejemplo-a06-2" class="div-a06"></div>
    </div>
</div>

Hemos creado nuestro primer gráfico reusable. Vamos a definir los valores de configuración de la sección anterior y pegar el código de creación del gráfico.


<div class="runnable" id="code-b01">
var width     = 800,
    height    = 300,
    margin    = {top: 20, right: 20, bottom: 20, left: 40},
    maxRadius = 20,
    duration  = 1e3;

var x = function(d) { return d.proteinas; },
    y = function(d) { return d.calorias; },
    r = function(d) { return d.grasa; };
</div>
<script>codeBlock().editor('#code-b01').init();</script>

y ahora reescribimos la función `createCharts` usando el código de antes.

<div class="runnable" id="code-b02">
function createScatterPlot(selection) {
    selection.each(function(data) {

        var div = d3.select(this);

        // COPY PASTE ----
        var svg = div.selectAll('svg').data([data]);

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
            .range([0, maxRadius]);

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
            .attr('cy', function(d) { return yScale(y(d)); });

        circles.transition().duration(duration)
            .attr('r', function(d) { return rScale(r(d)); })
            .attr('cx', function(d) { return xScale(x(d)); })
            .attr('cy', function(d) { return yScale(y(d)); });

        circles.exit().transition().duration(duration)
            .attr('r', 0);

        // END COPY PASTE
    });
}
</div>
<script>codeBlock().editor('#code-b02').init();</script>

y ahora usar la función con una selección que tiene datos bindeados

<div class="runnable" id="code-b03">
d3.select('#ejemplo-b03').selectAll('.div-b03')
    .data([datosA, datosB])
    .call(createScatterPlot);
</div>
<script>codeBlock().editor('#code-b03').init();</script>

<div class="ejemplo">
    <div id="ejemplo-b03">
        <div id="ejemplo-b03-1" class="div-b03"></div>
        <div id="ejemplo-b03-2" class="div-b03"></div>
    </div>
</div>

como si eso fuera poco

<div class="runnable" id="code-b04">
var divs04 = d3.select('#ejemplo-b04').selectAll('.div-b04').data([datosA, datosB, datosC]);

divs04.enter().append('div')
    .attr('class', 'div-b04')
    .attr('id', function(d, i) { return 'ejemplo-b04-' + (i + 1); });

divs04.call(createScatterPlot);
</div>
<script>codeBlock().editor('#code-b04').init();</script>

<div class="ejemplo">
    <div id="ejemplo-b04"></div>
</div>

