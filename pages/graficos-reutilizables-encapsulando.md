---
layout: seccion
title: 'Gráficos Reutilizables II: encapsulando el código'
parent:
    url: pages/graficos-reutilizables.html
    title: Gráficos Reusables
prev:
    url: pages/graficos-reutilizables-scatter.html
    title: Gráficos Reutilizables I
next:
    url: pages/graficos-reutilizables-3.html
    title: Gráficos Reutilizables III
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

Estos son los pasos que seguimos para crear el código en la sección anterior:

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

Ahora, vamos a encapsular este código de forma progresiva hasta llegar a escribir un gráfico reutilizable.

Volveremos a usar los datos de la sección anterior. También vamos a definir dos subconjuntos de datos por razones que se explicarán.


<div class="runnable" id="code-a01">
var datosA = [
            {nombre: 'Manzana',     color: '#ff0000',    calorias:  52, grasa: 0.2, proteinas:  0.3, azucar:'14'},
            {nombre: 'Hamburguesa', color: '#993300',  calorias: 295, grasa: 14,  proteinas: 17, azucar:'24'},
            {nombre: 'Pizza',       color: '#cc9900', calorias: 266, grasa: 10,  proteinas: 11, azucar:'33'},
            {nombre: 'Palta',       color: '#004400',  calorias: 160, grasa: 15,  proteinas:  2, azucar:'9'},
            {nombre:'Platano', color:'#ffcc00', calorias:'89', grasa:'0.3', proteinas:'1.1', azucar:'23'},
            {nombre:'Nuez', color:'#cc6600', calorias:'576', grasa:'49', proteinas:'21', azucar:'22'},
            {nombre:'Almendra', color:'#660033', calorias:'576', grasa:'49', proteinas:'21', azucar:'22'},
            {nombre:'Pollo', color:'#cc9900', calorias:'219', grasa:'12', proteinas:'27', azucar:'0'},
            {nombre:'Pavo', color:'#ffcc33', calorias:'111', grasa:'0.7', proteinas:'25', azucar:'0.1'},
            {nombre:'Baggel', color:'#cc9966', calorias:'250', grasa:'1.5', proteinas:'10', azucar:'49'},
            {nombre:'Brocoli', color:'#00bb00', calorias:'34', grasa:'0.4', proteinas:'2.8', azucar:'7'},
            {nombre:'Pan', color:'#cc6633', calorias:'289', grasa:'1.8', proteinas:'12', azucar:'56'},
            {nombre:'Papas fritas', color:'#ffcc00', calorias:'536', grasa:'35', proteinas:'7', azucar:'53'},
            {nombre:'Vino', color:'#660066', calorias:'83', grasa:'0', proteinas:'0.1', azucar:'2.7'},
            {nombre:'Uva', color:'#66cc66', calorias:'67', grasa:'0.4', proteinas:'0.6', azucar:'17'},
            {nombre:'Granola', color:'#ff9900', calorias:'471', grasa:'20', proteinas:'10', azucar:'64'},
            {nombre:'Zanahoria', color:'#ff3300', calorias:'41', grasa:'0.2', proteinas:'0.9', azucar:'10'},
            {nombre:'Tomate', color:'#ff0000', calorias:'18', grasa:'3.9', proteinas:'0.9', azucar:'3.9'},
            {nombre:'Naranja', color:'#ff6600', calorias:'47', grasa:'0.1', proteinas:'0.9', azucar:'12'},
            {nombre:'Pera', color:'#00ff00', calorias:'57', grasa:'0.1', proteinas:'0.4', azucar:'15'},
            {nombre:'Nutella', color:'#550000', calorias:'500', grasa:'27', proteinas:'5', azucar:'50'},
            {nombre:'Arroz', color:'#ffffcc', calorias:'111', grasa:'0.9', proteinas:'2.6', azucar:'23'},
            {nombre:'Chocolate', color:'#330000', calorias:'546', grasa:'31', proteinas:'4.9', azucar:'61'},
            {nombre:'Rabano', color:'#cc0033', calorias:'16', grasa:'0.1', proteinas:'0.7', azucar:'3.4'},
            {nombre:'Soya', color:'#004400', calorias:'446', grasa:'20', proteinas:'36', azucar:'30'},
            {nombre:'Aceite', color:'#007700', calorias:'884', grasa:'100', proteinas:'0', azucar:'0'},
            {nombre:'Leche', color:'#eeeeee', calorias:'42', grasa:'1', proteinas:'3.4', azucar:'5'},
            {nombre:'Queso', color:'#ffff00', calorias:'371', grasa:'32', proteinas:'18', azucar:'3.7'},
            {nombre:'Pan Pita', color:'#660033', calorias:'275', grasa:'1.2', proteinas:'9', azucar:'56'},
            {nombre:'Vacuno', color:'#660000', calorias:'250', grasa:'15', proteinas:'26', azucar:'0'},
            {nombre:'Zapayo', color:'#ff6600', calorias:'26', grasa:'0.1', proteinas:'1', azucar:'6'},                       
            {nombre:'Piña', color:'#ffff99', calorias:'50', grasa:'0.1', proteinas:'0.5', azucar:'13'},      
            {nombre:'Coco', color:'#ffffcc', calorias:'354', grasa:'33', proteinas:'3.3', azucar:'15'}      
        ];
var datosB = [
            {nombre: 'Manzana',     color: '#ff0000',    calorias:  52, grasa: 0.2, proteinas:  0.3, azucar:'14'},
            {nombre: 'Hamburguesa', color: '#993300',  calorias: 295, grasa: 14,  proteinas: 17, azucar:'24'},
            {nombre: 'Pizza',       color: '#cc9900', calorias: 266, grasa: 10,  proteinas: 11, azucar:'33'},
            {nombre: 'Palta',       color: '#004400',  calorias: 160, grasa: 15,  proteinas:  2, azucar:'9'},
            {nombre:'Platano', color:'#ffcc00', calorias:'89', grasa:'0.3', proteinas:'1.1', azucar:'23'},
            {nombre:'Nuez', color:'#cc6600', calorias:'576', grasa:'49', proteinas:'21', azucar:'22'},
            {nombre:'Almendra', color:'#660033', calorias:'576', grasa:'49', proteinas:'21', azucar:'22'},
            {nombre:'Pollo', color:'#cc9900', calorias:'219', grasa:'12', proteinas:'27', azucar:'0'},
            {nombre:'Pavo', color:'#ffcc33', calorias:'111', grasa:'0.7', proteinas:'25', azucar:'0.1'},
            {nombre:'Baggel', color:'#cc9966', calorias:'250', grasa:'1.5', proteinas:'10', azucar:'49'},
            {nombre:'Brocoli', color:'#00bb00', calorias:'34', grasa:'0.4', proteinas:'2.8', azucar:'7'},
            {nombre:'Pan', color:'#cc6633', calorias:'289', grasa:'1.8', proteinas:'12', azucar:'56'},
            {nombre:'Papas fritas', color:'#ffcc00', calorias:'536', grasa:'35', proteinas:'7', azucar:'53'},
            {nombre:'Vino', color:'#660066', calorias:'83', grasa:'0', proteinas:'0.1', azucar:'2.7'},
            {nombre:'Uva', color:'#66cc66', calorias:'67', grasa:'0.4', proteinas:'0.6', azucar:'17'},
            {nombre:'Granola', color:'#ff9900', calorias:'471', grasa:'20', proteinas:'10', azucar:'64'},
            {nombre:'Zanahoria', color:'#ff3300', calorias:'41', grasa:'0.2', proteinas:'0.9', azucar:'10'},
            {nombre:'Tomate', color:'#ff0000', calorias:'18', grasa:'3.9', proteinas:'0.9', azucar:'3.9'},
            {nombre:'Naranja', color:'#ff6600', calorias:'47', grasa:'0.1', proteinas:'0.9', azucar:'12'},
            {nombre:'Pera', color:'#00ff00', calorias:'57', grasa:'0.1', proteinas:'0.4', azucar:'15'},
            {nombre:'Nutella', color:'#550000', calorias:'500', grasa:'27', proteinas:'5', azucar:'50'},
            {nombre:'Arroz', color:'#ffffcc', calorias:'111', grasa:'0.9', proteinas:'2.6', azucar:'23'},
            {nombre:'Chocolate', color:'#330000', calorias:'546', grasa:'31', proteinas:'4.9', azucar:'61'},
            {nombre:'Rabano', color:'#cc0033', calorias:'16', grasa:'0.1', proteinas:'0.7', azucar:'3.4'}     
        ];  
var datosC = [
            {nombre: 'Manzana',     color: '#ff0000',    calorias:  52, grasa: 0.2, proteinas:  0.3, azucar:'14'},
            {nombre: 'Hamburguesa', color: '#993300',  calorias: 295, grasa: 14,  proteinas: 17, azucar:'24'},
            {nombre: 'Pizza',       color: '#cc9900', calorias: 266, grasa: 10,  proteinas: 11, azucar:'33'},
            {nombre: 'Palta',       color: '#004400',  calorias: 160, grasa: 15,  proteinas:  2, azucar:'9'},
            {nombre:'Platano', color:'#ffcc00', calorias:'89', grasa:'0.3', proteinas:'1.1', azucar:'23'},
            {nombre:'Nuez', color:'#cc6600', calorias:'576', grasa:'49', proteinas:'21', azucar:'22'},
            {nombre:'Almendra', color:'#660033', calorias:'576', grasa:'49', proteinas:'21', azucar:'22'},
            {nombre:'Pollo', color:'#cc9900', calorias:'219', grasa:'12', proteinas:'27', azucar:'0'},
            {nombre:'Pavo', color:'#ffcc33', calorias:'111', grasa:'0.7', proteinas:'25', azucar:'0.1'},
            {nombre:'Baggel', color:'#cc9966', calorias:'250', grasa:'1.5', proteinas:'10', azucar:'49'},
            {nombre:'Brocoli', color:'#00bb00', calorias:'34', grasa:'0.4', proteinas:'2.8', azucar:'7'},
            {nombre:'Pan', color:'#cc6633', calorias:'289', grasa:'1.8', proteinas:'12', azucar:'56'},
            {nombre:'Papas fritas', color:'#ffcc00', calorias:'536', grasa:'35', proteinas:'7', azucar:'53'},
            {nombre:'Vino', color:'#660066', calorias:'83', grasa:'0', proteinas:'0.1', azucar:'2.7'},
            {nombre:'Uva', color:'#66cc66', calorias:'67', grasa:'0.4', proteinas:'0.6', azucar:'17'},
            {nombre:'Granola', color:'#ff9900', calorias:'471', grasa:'20', proteinas:'10', azucar:'64'},
            {nombre:'Zanahoria', color:'#ff3300', calorias:'41', grasa:'0.2', proteinas:'0.9', azucar:'10'},
            {nombre:'Tomate', color:'#ff0000', calorias:'18', grasa:'3.9', proteinas:'0.9', azucar:'3.9'}     
        ];      

</div>
<script>codeBlock().editor('#code-a01').init();</script>

Como siempre, empezamos con el Data Binding. Por ahora nada nuevo.

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

La selección precedente es un arreglo. Podemos recorrerlo y operar sobre cada uno de sus elementos usando el método `each`. El contexto `this` referencia al elemento del DOM correspondiente al elemento de la selacción. Resulta útil inspeccionar estos arreglos con la consola para aclarar los conceptos anteriores.

<div class="runnable" id="code-a03">
divs01.each(function(data) {
    var div = d3.select(this);
    console.log(div);
});
</div>
<script>codeBlock().editor('#code-a03').init();</script>

Ahora, con esta sintaxis, tenemos acceso a la selección del div, y a los datos que estan vinculados al div. Como recordarán de la sección precedente, esto es todo lo que necesitamos, además de la configuración, para crear un gráfico. Empezaremos creando un SVG para cada div:

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

En vez de usar una función anónima en `each`, podemos usar una función creada explícitamente para encapsular la creación de los elementos internos.

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

Pero podemos encapsular un poco más el asunto:

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

Podemos usar la sintaxis `.call`, y ni siquiera necesitamos nombrar la selección:

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

Podemos generalizar este código aún más:

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
    margin    = {top: 30, right: 20, bottom: 20, left: 40},
    maxRadius = 20,
    duration  = 1e3;

var x = function(d) { return d.proteinas; },
    y = function(d) { return d.calorias; },
    r = function(d) { return d.grasa; };
</div>
<script>codeBlock().editor('#code-b01').init();</script>

Ahora reescribimos la función `createCharts` usando el código de la sección anterior:

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
            .attr('stroke-width','1');

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

Finalmente, usaremos la función con una selección que tiene datos bindeados:

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

Y como si esto fuera poco:

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

Nótese que no necesitamos escribir código adicional para crear más gráficos. El próximo paso consiste en encapsular la definición de los parámetros del gráfico. Para esto, se necesita entender los rudimentos de 'clausura' en JavaScript.

