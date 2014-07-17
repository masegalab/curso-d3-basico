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

Vamos a usar mapas en conjunto con datos geográficos externos (no mapas) para crear una visualización de las rutas aéreas más importantes. Comenzaremos dibujando el mapa usando nuestro mapa reusable, esta vez usando el formato TopoJSON.

<script src="{{site.page.root}}/pages/geojson-map.js"></script>

<div class="runnable" id="code-a01">
// Creamos y configuramos el mapa reusable
var map = geojsonMap();

// Cargamos los datos en formato topojson
d3.json('/src/data/countries.topojson', function(error, data) {

    if (error) { console.error(error); }

    // Convierte los datos a GeoJSON
    geojson = topojson.feature(data, data.objects.countries);

    d3.select('#ejemplo-a01')
        .data([geojson.features])
        .call(map);
});
</div>
<script>codeBlock().editor('#code-a01').init();</script>

<div class="ejemplo">
    <div id="ejemplo-a01"></div>
</div>

### Aeropuertos

Nuestro archivo archivo [airports.dat]({{site.page.root}}/data/airports.dat) que contiene información de los aeropuertos en formato CSV. Hay casi 7,000 aeropuertos en el archivo, cada uno tiene códigos, el nombre de la ciudad en que está y su ubicación geográfica.

<div class="runnable" id="code-k01">
// AirportId,Name,City,Country,IATA,ICAO,Lat,Lon,Alt,TimeZone,DST
// 1,"Goroka","Goroka","Papua New Guinea","GKA","AYGA",-6.081689,145.391881,5282,10,"U"
// 2,"Madang","Madang","Papua New Guinea","MAG","AYMD",-5.207083,145.7887,20,10,"U"
// 3,"Mount Hagen","Mount Hagen","Papua New Guinea","HGU","AYMH",-5.826789,144.295861,5388,10,"U"
// 4,"Nadzab","Nadzab","Papua New Guinea","LAE","AYNZ",-6.569828,146.726242,239,10,"U"
// 5,"Port Moresby Jacksons Intl","Port Moresby","Papua New Guinea","POM","AYPY",-9.443383,147.22005,146,10,"U"
</div>
<script>codeBlock().editor('#code-k01').init();</script>

Vamos a cargar los datos usando `d3.csv`, aprovechando de calcular la proyección de cada aeropuerto. Guardaremos las coordenadas (en pixeles) en el attributo `pixels` de cada ítem de datos.

<div class="runnable" id="code-a02">
d3.csv('/src/data/airports.dat', function(error, data) {

    if (error) { console.error(error); }

    var div = d3.select('#ejemplo-a01'),
        svg = div.selectAll('svg').data([data]);

    var projection = map.projection();

    // Precalculamos la proyección del aeropuerto
    data.forEach(function(d) {
        d.pixels = projection([+d.Lon, +d.Lat]);
    });

    // Agregamos un círculo para cada aeropuerto
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


### Graficando las Rutas

El archivo [routes.dat]({{site.page.root}}/src/data/routes.dat), que tiene información de las routas aéreas en formato CSV. Cada línea del archivo contiene información del aeropuerto de orígen y de destino, pero no las coordenadas de cada aeropuerto. Para obtenerlas, necesitaremos juntar información de ambos archivos.

<div class="runnable" id="code-k02">
// Airline,AirlineId,Source,SourceId,Target,TargetId,CodeShare,Stops,Equipment
// #C7,\N,MAO,2551,CIZ,7398,,0,EMB
// #C7,\N,MAO,2551,MBZ,7396,,0,EMB
// #C7,\N,MAO,2551,MNX,2594,,0,EMB
// #C7,\N,MNX,2594,RBB,7397,,0,EMB
</div>
<script>codeBlock().editor('#code-k02').init();</script>

Graficaremos los países una vez más para usar este gráfico como base.

<div class="runnable" id="code-b01">
// Creamos y configuramos el mapa reusable
var map = geojsonMap();

// Cargamos los datos en formato topojson
d3.json('/src/data/countries.topojson', function(error, data) {

    if (error) { console.error(error); }

    // Convierte los datos a GeoJSON
    geojson = topojson.feature(data, data.objects.countries);

    d3.select('#ejemplo-b01')
        .data([geojson.features])
        .call(map);
});
</div>
<script>codeBlock().editor('#code-b01').init();</script>

<div class="ejemplo">
    <div id="ejemplo-b01"></div>
</div>

Ahora necesitamos cargar dos archivos de datos, y agregar las coordenadas de los aeropuertos de orígen y destino a cada ruta. Cargaremos ambos archivos por separado, cada uno con su propia llamada a `d3.csv`.

<div class="runnable" id="code-b02">
// Guardaremos los aeropuertos y rutas en variables globales
var airports = {};
var routes;

// Marcaremos estas variables como true al cargar cada set de datos
var airportsReady = false,
    routesReady = false;

// Cargamos los datos de aeropuertos
d3.csv('/src/data/airports.dat', function(error, data) {

    if (error) { console.error(error); }

    data.forEach(function(d) {
        d.coords = [+d.Lon, +d.Lat];
        airports[d.AirportId] = d;
    });

    airportsReady = true;

    // Si ambos archivos están listos, juntar los datos y dibujar
    if ((airportsReady) && (routesReady)) {
        joinData();
        renderLines();
    }

});

d3.csv('/src/data/routes.dat', function(error, data) {

    if (error) { console.error(error); }

    routes = data;
    routesReady = true;

    if ((airportsReady) && (routesReady)) {
        joinData();
        renderLines();
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

function renderLines() {

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














