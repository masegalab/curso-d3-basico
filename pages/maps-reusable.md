---
layout: seccion
title: Mapa Reusable
parent:
    url: pages/maps.html
    title: Mapas
prev:
    url: pages/maps-path-generator.html
    title: Dibujando
next:
    url: pages/mapas-topojson.html
    title: TopoJSON
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


<div class="runnable" id="code-e01">
var width  = 600,
    height = 300;

function geojsonMap() {

    var me = {
        height: 300,
        width:  600,
        projection: d3.geo.equirectangular(),
        scale: 600 / (2 * Math.PI)
    };

    function chart(selection) {
        selection.each(function(features) {

            var div = d3.select(this),
                svg = div.selectAll('svg.geojson-map').data([features]);

            svg.enter().append('svg')
                .classed('geojson-map', true);

            svg.attr('width', me.width).attr('height', me.height);

            svg.exit().remove();

            // Background
            var background = svg.selectAll('rect.background').data([features]);

            background.enter().append('rect')
                .classed('background', true);

            background
                .attr('width', me.width)
                .attr('height', me.height);

            background.exit().remove();

            // Configure the projection
            me.projection
                .translate([me.width / 2, me.height / 2])
                .scale(me.scale);

            var pathGenerator = d3.geo.path()
                .projection(me.projection);

            // Graticule
            var graticule = d3.geo.graticule();

            var graticuleLines = svg.selectAll('path.graticule').data([graticule()]);

            graticuleLines.enter().append('path')
                .classed('graticule', true);

            graticuleLines
                .attr('d', pathGenerator);

            graticuleLines.exit().remove();

            // Render the features
            var pathFeatures = svg.selectAll('path.feature').data(features);

            pathFeatures.enter().append('path')
                .classed('feature', true);

            pathFeatures.attr('d', pathGenerator);

            pathFeatures.exit().remove();
        });
    }

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

    chart.projection = function(value) {
        if (!arguments.length) { return me.projection; }
        me.projection = value;
        return chart;
    };

    chart.scale = function(value) {
        if (!arguments.length) { return me.scale; }
        me.scale = value;
        return chart;
    };

    return chart;
}

var map = geojsonMap();

d3.json('/src/data/countries.geojson', function(error, data) {

    if (error) { console.error(error); }

    d3.select('#ejemplo-e01')
        .data([data.features])
        .call(map);


    d3.select('#boton-rm').on('click', function() {

        map.projection(d3.geo.mercator());

        d3.select('#ejemplo-e01')
            .data([data.features])
            .call(map);

    });

    d3.select('#boton-re').on('click', function() {

        map.projection(d3.geo.equirectangular());

        d3.select('#ejemplo-e01')
            .data([data.features])
            .call(map);

    });

    d3.select('#boton-ro').on('click', function() {

        map.projection(d3.geo.orthographic().clipAngle(90));

        d3.select('#ejemplo-e01')
            .data([data.features])
            .call(map);

    });

    d3.select('#boton-rc').on('click', function() {

        map.projection(d3.geo.conicEquidistant())
            .scale(0.75 * width / (2 * Math.PI));

        d3.select('#ejemplo-e01')
            .data([data.features])
            .call(map);

    });

});
</div>
<script>codeBlock().editor('#code-e01').init();</script>

<div class="btn-group btn-group-sm">
    <button id="boton-rm" type="button" class="btn btn-default btn-sm">Mercator</button>
    <button id="boton-re" type="button" class="btn btn-default btn-sm">Equirectangular</button>
    <button id="boton-ro" type="button" class="btn btn-default btn-sm">Orthographic</button>
    <button id="boton-rc" type="button" class="btn btn-default btn-sm">Conic Equidistant</button>
</div>

<div class="ejemplo">
    <div id="ejemplo-e01"></div>
</div>

### Centrando

<div>
    <style>
        .centered {
            fill: #dd0000;
        }
    </style>
</div>

<div class="runnable" id="code-e02">
var width  = 600,
    height = 300,
    zoomScale = 2,
    x = width / 2,
    y = height / 2;

var projection = d3.geo.equirectangular()
    .scale(width / (2 * Math.PI))
    .translate([width / 2, height / 2]);

var pathGenerator = d3.geo.path().projection(projection);

d3.json('/src/data/countries.geojson', function(error, data) {

    var div = d3.select('#ejemplo-e02'),
        svg = div.selectAll('svg').data([data.features]);

    svg.enter().append('svg');

    svg.attr('width', width).attr('height', height);

    svg.exit().remove();

    var gCountries = svg.selectAll('g.countries').data([data.features]);

    gCountries.enter().append('g')
        .classed('countries', true);

    gCountries.exit().remove();

    var pathCountries = gCountries.selectAll('path.country').data(data.features);

    pathCountries.enter().append('path')
        .classed('country', true);

    pathCountries
        .on('click', function(d) {

            d._centered = !d._centered;

            pathCountries.each(function(u) {
                if (u !== d) { u._centered = false; }
            });

            pathCountries.classed('centered', false);
            d3.select(this).classed('centered', d._centered);

            if (d._centered) {

                // Centrar y escalar
                var centerCoords = d3.geo.centroid(d),
                    centerPixels = projection(centerCoords);

                gCountries.transition().duration(1500)
                    .attr('transform', function() {
                        var dx = x - zoomScale * centerPixels[0],
                            dy = y - zoomScale * centerPixels[1];
                        var t = 'translate(' + [dx, dy] + ')',
                            s = 'scale(' + zoomScale + ')';
                        return t + s;
                    });

            } else {
                gCountries.transition().duration(1500)
                    .attr('transform', '');
            }

        });

    pathCountries
        .attr('d', pathGenerator);

    pathCountries.exit().remove();
});
</div>
<script>codeBlock().editor('#code-e02').init();</script>

<div class="ejemplo">
    <div id="ejemplo-e02"></div>
</div>