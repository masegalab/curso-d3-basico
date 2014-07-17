---
layout: seccion
title: Path Generator
parent:
    url: pages/maps.html
    title: Mapas
prev:
    url: pages/maps-proyecciones.html
    title: Proyecciones
next:
    url: pages/maps-reusable.html
    title: Mapa Reutilizable
---

<div>
    <style>
        .feature {
            fill: #6F3C1F;
        }

        .background {
            fill: #C7E4FF;
        }

        .graticule {
            fill-opacity: 0;
            stroke: #fff;
        }
    </style>
</div>

La función de proyección nos permite traducir las coordenadas de cualquier punto del globo a pixeles.
Como ya habíamos anticipado, para dibujar las fronteras del mapa, necesitamos un generador de camino.

### Madagascar

Esta vez, usaremos Madagascar como ejemplo. En vez de copiar nuevamente el Feature Madagascar, lo ubicaremos en el archivo [GeoJSON]({{site.page.root}}/src/data/countries.geojson) que contiene la totalidad de los países. 

<div class="runnable" id="code-d01">
var madagascarFeature;

d3.json('/src/data/countries.geojson', function(error, data) {

    if (error) { console.error(error); }

    madagascarFeature = data.features.filter(function(d) {
        return d.properties.sov_a3 === 'MDG';
    }).pop();
});
</div>
<script>codeBlock().editor('#code-d01').init();</script>

Enseguida, graficamos un generador de caminos para graficar Madagascar:

<div class="runnable" id="code-d02">
var width  = 600,
    height = 300;

var projection = d3.geo.equirectangular()
    .scale(width / (2 * Math.PI))
    .translate([width / 2, height / 2]);

//Generador de caminos
//Observe pathGenerator(madagascarFeature) en la consola!
var pathGenerator = d3.geo.path().projection(projection);

var div = d3.select('#ejemplo-d01'),
    svg = div.selectAll('svg').data([madagascarFeature]);

svg.enter().append('svg');

svg.attr('width', width).attr('height', height);

svg.exit().remove();

var pathMadagascar = svg.selectAll('path.mdg').data([madagascarFeature]);

pathMadagascar.enter().append('path')
    .classed('mdg', true);

pathMadagascar
    .attr('d', pathGenerator);

pathMadagascar.exit().remove();

</div>
<script>codeBlock().editor('#code-d02').init();</script>


<div class="ejemplo">
    <div id="ejemplo-d01"></div>
</div>

Explorando la variable `madagascarFeature` en la consola, podemos centrar el gráfico y magnificar el tamaño de Madagascar manualmente. Sin embargo, esto se puede automatizar.

#### Centrado automático

<div class="runnable" id="code-d03">
var width  = 600,
    height = 300;

var geoCentroid = d3.geo.centroid(madagascarFeature);

var projection = d3.geo.equirectangular()
    .scale(5 * width / (2 * Math.PI))
    .translate([width / 2, height / 2])
    .center(geoCentroid);

var pathGenerator = d3.geo.path().projection(projection);

var div = d3.select('#ejemplo-d02'),
    svg = div.selectAll('svg').data([madagascarFeature]);

svg.enter().append('svg');

svg.attr('width', width).attr('height', height);

svg.exit().remove();

var pathMadagascar = svg.selectAll('path.mdg').data([madagascarFeature]);

pathMadagascar.enter().append('path')
    .classed('mdg', true);

pathMadagascar
    .attr('d', pathGenerator);

pathMadagascar.exit().remove();

</div>
<script>codeBlock().editor('#code-d03').init();</script>

<div class="ejemplo">
    <div id="ejemplo-d02"></div>
</div>
