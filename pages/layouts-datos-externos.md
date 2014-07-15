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

Podemos cargar datos externos usando `d3.json`, `d3.csv`, `d3.tsv` o `d3.xml`. Estas funciones reciben la URL del archivo de datos y un _callback_, que será invocado una vez que el archivo de datos sea descargado completamente.

Hay que usar un servidor

#### JSON

<div class="runnable" id="code-a01">
d3.json('/assets/data/food.json', function(error, data) {

    // Se lanza un error si el archivo no es accesible o si no se puede procesar
    if (error) { console.error(error); }

    console.log(data);
});
</div>
<script>codeBlock().editor('#code-a01').init();</script>

Estas funciones son asíncronas, esto quiere decir que mientras los datos se bajan, el script JavaScript se sigue ejecutando.


<div class="runnable" id="code-a02">
// Declaramos la variable data en el contexto global
var food;

// Cargamos los datos usando `d3.json`
d3.json('/assets/data/food.json', function(error, data) {

    // Se lanza un error si el archivo no es accesible o si no se puede procesar
    if (error) {
        console.error(error);
        throw error;
    }

    food = data;
    console.log('[callback] food =', food);
});

// En este punto, la variable `food` no está definida aun

console.log('[script] food =', food);

</div>
<script>codeBlock().editor('#code-a02').init();</script>


#### CSV

<div class="runnable" id="code-a03">
d3.csv('/assets/data/wbdata.csv', function(error, data) {

    if (error) { console.error(error); }

    console.log(data);

});
</div>
<script>codeBlock().editor('#code-a03').init();</script>

Los elementos del arreglo son objetos JavaScript.
<div class="runnable" id="code-a04">
{
    "Country":        "Brazil",
    "GDP":            "2.24878E+12",
    "LifeExpectancy": "73.61787805",
    "Population":     "198656019",
    "GDPCapita":      "11319.97371"
}
</div>
<script>codeBlock().editor('#code-a04').init();</script>

Lamentablemente, hay que convertir los campos numéricos.

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

Con los datos ya cargados, podemos usar los gráficos reusables. Configuramos el gráfico para nuestro conjunto de datos

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

Cargamos los datos y agregamos listeners a los botones

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

Una vez cargados los datos, que vengan de un archivo externo, una API o una variable no es relevante. En este caso, los datos tienen la estructura que necesitamos para crear el gráfico, en otros casos, puede ser necesario transformar los datos.

En D3, un _layout_ es una función configurable (muy parecida a un gráfico reusable) que transforma datos de un formato a otro. En la siguiente sección, usaremos varios layout para convertir la estructura de los datos.




