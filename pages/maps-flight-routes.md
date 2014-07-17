---
layout: seccion
title: Flight Routes
parent:
    url: pages/maps.html
    title: Mapas
prev:
    url: pages/maps-topojson.html
    title: TopoJSON
---

<div>
    <style>
        .feature {
            fill: #777;
        }

        .background {
            fill: #333;
        }

        .graticule {
            fill-opacity: 0;
            stroke-opacity: 0;
        }

        .airport {
            fill: #ffff00;
            fill-opacity: 0.5;
        }

        .route {
            stroke: #ffff00;
            stroke-opacity: 0.02;
        }
    </style>
</div>

[OpenFlights](http://openflights.org/data.html)

### Airports

<script src="{{site.page.root}}/pages/geojson-map.js"></script>

<div class="runnable" id="code-a01">

var map = geojsonMap();

d3.json('/src/data/countries.geojson', function(error, data) {

    if (error) { console.error(error); }

    d3.select('#ejemplo-a01')
        .data([data.features])
        .call(map);
});

</div>
<script>codeBlock().editor('#code-a01').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a01"></div>
</div>

<div class="runnable" id="code-a02">
d3.csv('/src/data/airports.dat', function(error, data) {

    if (error) { console.error(error); }

    var div = d3.select('#ejemplo-a01'),
        svg = div.selectAll('svg').data([data]);

    var projection = map.projection();

    data.forEach(function(d) {
        d.pixels = projection([+d.Lon, +d.Lat]);
    });

    var circles = svg.selectAll('circle.airport').data(data);

    circles.enter().append('circle')
        .classed('airport', true);

    circles
        .attr('cx', function(d) { return d.pixels[0]; })
        .attr('cy', function(d) { return d.pixels[1]; })
        .attr('r', 1);

    circles.exit().remove();

});

</div>
<script>codeBlock().editor('#code-a02').init();</script>


#### Lineas


<div class="runnable" id="code-b01">

var mapB01 = geojsonMap();

d3.json('/src/data/countries.geojson', function(error, data) {

    if (error) { console.error(error); }

    d3.select('#ejemplo-b01')
        .data([data.features])
        .call(mapB01);
});

</div>
<script>codeBlock().editor('#code-b01').init();</script>

<div class="ejemplo">
    <div id="ejemplo-b01"></div>
</div>

<div class="runnable" id="code-b02">

var airports = {};
var routes;

var airportsReady = false,
    routesReady = false;

d3.csv('/src/data/airports.dat', function(error, data) {

    if (error) { console.error(error); }

    data.forEach(function(d) {
        d.coords = [+d.Lon, +d.Lat];
        airports[d.AirportId] = d;
    });

    airportsReady = true;

    if ((airportsReady) && (routesReady)) {
        joinData();
        addLines();
    }

});

d3.csv('/src/data/routes.dat', function(error, data) {

    if (error) { console.error(error); }

    routes = data;
    routesReady = true;

    if ((airportsReady) && (routesReady)) {
        joinData();
        addLines();
    }
});

function joinData() {
    routes.forEach(function(route) {
        route.sourceAirport = airports[route.SourceId];
        route.targetAirport = airports[route.TargetId];
    });

    routes = routes.filter(function(d) {
        return d.sourceAirport && d.targetAirport;
    });
}

function addLines() {

    var div = d3.select('#ejemplo-b01'),
        svg = div.selectAll('svg').data([routes]);

    var lines = svg.selectAll('line.route')
        .data(routes);

    lines.enter().append('line')
        .classed('route', true);

    var projection = mapB01.projection();

    lines
        .attr('x1', function(d) {
            return projection(d.sourceAirport.coords)[0];
        })
        .attr('y1', function(d) {
            return projection(d.sourceAirport.coords)[1];
        })
        .attr('x2', function(d) {
            return projection(d.targetAirport.coords)[0];
        })
        .attr('y2', function(d) {
            return projection(d.targetAirport.coords)[1];
        })
        .attr('stroke', 'blue');

    lines.exit().remove();
}

</div>
<script>codeBlock().editor('#code-b02').init();</script>














