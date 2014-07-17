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
    url: pages/mapas-reusable.html
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

### Madagascar

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

<div class="runnable" id="code-d02">
var width  = 600,
    height = 300;

var projection = d3.geo.equirectangular()
    .scale(width / (2 * Math.PI))
    .translate([width / 2, height / 2]);

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
