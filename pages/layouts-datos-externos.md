---
layout: seccion
title: Usando Datos Externos
parent:
    url: pages/layouts.html
    title: Layouts
prev:
    url: pages/layouts.html
    title: Layouts
next:
    url: pages/layouts-pie.html
    title: Pie Layout
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

Podemos cargar datos externos usando `d3.json`, `d3.csv`, `d3.tsv` o `d3.xml`. Estas funciones reciben la URL del archivo de datos y una función _callback_, que será invocada una vez que el archivo de datos sea descargado completamente.

Cuando abrimos un archivo html, el browser lo abre usando el protocolo `file://`. Debido a consideraciones de seguridad, el browser no permite usar las funciones tipo `d3.json`.

Para poder cargar datos externos, se debe acceder al archivo html usando un servidor. Podemos servir el contenido de un directorio usando python o algún otro servidor estático.

<div class="runnable" id="code-d01">
// Sirve el directorio actual en http://localhost:8000
// python -m SimpleHTTPServer
</div>
<script>codeBlock().editor('#code-d01').init();</script>

#### Archivos JSON

JSON es un formato de archivos usado para serializar objetos JavaScript. Por ejemplo, los datos de los alimentos ahora están en un archivo [JSON]({{site.page.root}}/assets/data/food.json).

Esta es la manera de cargar un archivo JSON:

<div class="runnable" id="code-a01">
d3.json('/assets/data/food.json', function(error, data) {

    // Se lanza un error si el archivo no es accesible o si no se puede procesar
    if (error) { console.error(error); }

    console.log(data);
});
</div>
<script>codeBlock().editor('#code-a01').init();</script>

Esta función es asíncrona, esto quiere decir que mientras los datos se bajan, el script JavaScript se sigue ejecutando.

<div class="runnable" id="code-a02">
// Declaramos la variable data en el contexto global
var food;

// Cargamos los datos usando `d3.json`
d3.json('/assets/data/food.json', function(error, data) {

    // Se lanza un error si el archivo no es accesible o si no se puede procesar
    if (error) {
        console.error(error);
    }

    food = data;
    console.log('[callback] food =', food);
});

// En este punto, la variable `food` no está definida aun
console.log('[script] food =', food);
</div>
<script>codeBlock().editor('#code-a02').init();</script>

#### Archivos CSV

Para cargar un archivo CSV, el código es similar. En este caso, el [archivo CSV]({{site.page.root}}/assets/wbdata.csv) contiene datos de países.

<div class="runnable" id="code-a03">
d3.csv('/assets/data/wbdata.csv', function(error, data) {

    if (error) { console.error(error); }

    console.log(data);

});
</div>
<script>codeBlock().editor('#code-a03').init();</script>

La función `d3.csv` se encarga de convertir cada fila en un objeto JavaScript.

<div class="runnable" id="code-a04">
// {
//    "Country":        "Brazil",
//    "GDP":            "2.24878E+12",
//    "LifeExpectancy": "73.61787805",
//    "Population":     "198656019",
//    "GDPCapita":      "11319.97371"
// }
</div>
<script>codeBlock().editor('#code-a04').init();</script>

Lamentablemente, hay que convertir los campos numéricos manualmente, porque CSV no especifica el formato de cada columna. Pero se pueden convertir fácilmente.

<div class="runnable" id="code-a05">
d3.csv('/assets/data/wbdata.csv', function(error, data) {

    if (error) { console.error(error); }

    // Convertimos los campos numericos a numero
    data.forEach(function(d) {
        d.GDP            = +d.GDP;
        d.LifeExpectancy = +d.LifeExpectancy;
        d.Population     = +d.Population;
        d.GDPCapita      = +d.GDPCapita;
    });

    console.log(data);
});
</div>
<script>codeBlock().editor('#code-a05').init();</script>

Con los datos ya cargados, podemos usar los gráficos reutilizables de la sección anterior. Por ejemplo, podemos configurar el [barchart]({{site.page.root}}/pages/bar-chart.js) para usar estos nuevos datos.

<script src="{{site.page.root}}/pages/bar-chart.js"></script>
<div class="runnable" id="code-a06">
var barchart = barChart()
    .x(function(d) { return d.GDPCapita; })
    .label(function(d) { return d.Country.toUpperCase(); })
    .margin({top: 10, right: 10, bottom: 30, left: 200})
    .width(600)
    .height(1200);
</div>
<script>codeBlock().editor('#code-a06').init();</script>

Cargamos los datos nuevamente, y agregamos botones para visualizar distintas variables. Recordar que hay que agregar callbacks para el evento `click` de cada botón.

<div class="runnable" id="code-a07">
d3.csv('/assets/data/wbdata.csv', function(error, data) {

    if (error) { console.error(error); }

    // Convertimos los campos numericos a numero
    data.forEach(function(d) {
        d.GDP            = +d.GDP;
        d.LifeExpectancy = +d.LifeExpectancy;
        d.Population     = +d.Population;
        d.GDPCapita      = +d.GDPCapita;
    });

    d3.select('#ejemplo-a06')
        .data([data])
        .call(barchart);

    d3.select('#boton-life').on('click', function() {
        barchart
            .x(function(d) { return d.LifeExpectancy; });

        d3.select('#ejemplo-a06')
            .data([data])
            .call(barchart);
    });

    d3.select('#boton-pib').on('click', function() {
        barchart
            .x(function(d) { return d.GDPCapita; });

        d3.select('#ejemplo-a06')
            .data([data])
            .call(barchart);
    });

    d3.select('#boton-population').on('click', function() {
        barchart
            .x(function(d) { return d.Population; });

        d3.select('#ejemplo-a06')
            .data([data])
            .call(barchart);
    });
});


</div>
<script>codeBlock().editor('#code-a07').init();</script>

<div class="ejemplo">
    <div class="btn-group">
        <button id="boton-life" type="button" class="btn btn-default btn-sm">
        Esperanza de vida
        </button>
        <button id="boton-pib" type="button" class="btn btn-default btn-sm">
        PIB per cápita
        </button>
        <button id="boton-population" type="button" class="btn btn-default btn-sm">
        Población
        </button>
    </div>

    <div id="ejemplo-a06"></div>
</div>

Una vez cargados los datos, es irrelevante que los datos vengan de un archivo externo o que sean una variable definida en el script.
