---
layout: seccion
title: Ejemplo de Uso
parent:
    url: pages/graficos-reutilizables.html
    title: Gráficos Reutilizables
prev:
    url: pages/graficos-reutilizables-scatter-chart.html
    title: Scatter Chart
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

Los datos

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

Vamos a incluir el código del gráfico usando un archivo externo: `<script src="/pages/scatter-chart.js"></script>`.

<script src="{{site.page.root}}/pages/scatter-chart.js"></script>

Ahora creamos el gráfico como antes. Para hacer más interesante el ejemplo, vamos a agregar botones para alternar lo que se grafica.

<div class="runnable" id="code-a02">
    var scatter = scatterChart()
        .x(function(d) { return d.calorias; })
        .y(function(d) { return d.proteinas; })
        .r(function(d) { return d.grasa; })
        .width(600)
        .height(200);

    d3.select('#ejemplo-a02')
        .data([datosA])
        .call(scatter);
</div>
<script>codeBlock().editor('#code-a02').init();</script>

<div class="ejemplo">

    <div class="btn-group">
        <button id="boton-cg" type="button" class="btn btn-default">Calorias vs. Grasa</button>
        <button id="boton-cp" type="button" class="btn btn-default">Calorias vs. Proteinas</button>
        <button id="boton-ca" type="button" class="btn btn-default">Calorias vs. Azúcar</button>
    </div>

    <div id="ejemplo-a02"></div>
</div>

<div class="ejemplo">
    <div id="ejemplo-a03"></div>
</div>

Ahora agregamos event listeners a los botones, para cambiar las funciones de acceso a las variables y actualizar el gráfico.

<div class="runnable" id="code-a04">

    d3.select('#boton-cg').on('click', function() {
        scatter
            .x(function(d) { return d.calorias; })
            .y(function(d) { return d.grasa; });

        d3.select('#ejemplo-a02')
            .data([datosA])
            .call(scatter);
    });

    d3.select('#boton-cp').on('click', function() {
        scatter
            .x(function(d) { return d.calorias; })
            .y(function(d) { return d.proteinas; });

        d3.select('#ejemplo-a02')
            .data([datosA])
            .call(scatter);
    });

    d3.select('#boton-ca').on('click', function() {
        scatter
            .x(function(d) { return d.calorias; })
            .y(function(d) { return d.azucar; });

        d3.select('#ejemplo-a02')
            .data([datosA])
            .call(scatter);
    });

</div>
<script>codeBlock().editor('#code-a04').init();</script>
