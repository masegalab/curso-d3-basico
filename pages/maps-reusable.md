---
layout: seccion
title: Mapa Reutilizable
parent:
    url: pages/maps.html
    title: Mapas
prev:
    url: pages/maps-path-generator.html
    title: Dibujando Mapas
next:
    url: pages/maps-topojson.html
    title: El Formato TopoJSON
---

<div>
    <style>
        .feature {
            fill: #138c9e;
        }

        .background {
            fill: #ccc;
        }

        .graticule {
            fill-opacity: 0;
            stroke: #fff;
        }

        .country {
            fill: #0d6470;
        }

        .centered {
            fill: #18b5cb;
        }

    </style>
</div>

Podemos escribir una función reusable para dibujar el mapa. Entre los atributos que tendrá el mapa están las dimensiones `width` y `height`, la proyección (`equirectangular` en este caso) y la escala. Notar que la escala se podría configurar directamente en la proyección.

<div class="runnable" id="code-e01">
function geojsonMap() {

    // Atributos del mapa
    var me = {
        height: 300,
        width:  600,
        projection: d3.geo.equirectangular(),
        scale: 600 / (2 * Math.PI)
    };

    function chart(selection) {
        selection.each(function(features) {

            // Data binding
            var div = d3.select(this),
                svg = div.selectAll('svg.geojson-map').data([features]);

            // Creación del contenedor SVG
            svg.enter().append('svg')
                .classed('geojson-map', true);

            svg.attr('width', me.width).attr('height', me.height);

            svg.exit().remove();

            // Background de la figura
            var background = svg.selectAll('rect.background').data([features]);

            background.enter().append('rect')
                .classed('background', true);

            background
                .attr('width', me.width)
                .attr('height', me.height);

            background.exit().remove();

            // Configuramos la proyección
            me.projection
                .translate([me.width / 2, me.height / 2])
                .scale(me.scale);

            // Configuramos el generador de paths
            var pathGenerator = d3.geo.path()
                .projection(me.projection);

            // Dibujamos los path que representan los features
            var pathFeatures = svg.selectAll('path.feature').data(features);

            pathFeatures.enter().append('path')
                .classed('feature', true);

            pathFeatures.attr('d', pathGenerator);

            pathFeatures.exit().remove();

            // Creamos las línes de meridianos y paralelos
            var graticule = d3.geo.graticule();

            var graticuleLines = svg.selectAll('path.graticule').data([graticule()]);

            graticuleLines.enter().append('path')
                .classed('graticule', true);

            graticuleLines
                .attr('d', pathGenerator);

            graticuleLines.exit().remove();
        });
    }

    // Funciones de acceso

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
</div>
<script>codeBlock().editor('#code-e01').init();</script>

Ahora, podemos crear una instancia del gráfico, seleccionar un contenedor para el mapa, vincular los datos e invocar el mapa. Notar que el mapa puede ser creado y configurado fuera del callback de la función `d3.json`.

<div class="runnable" id="code-e05">
var map = geojsonMap();

d3.json('/src/data/countries.geojson', function(error, data) {

    if (error) { console.error(error); }

    // Rendering
    d3.select('#ejemplo-e01')
        .data([data.features])
        .call(map);


    // Mercator
    d3.select('#boton-rm').on('click', function() {
        map.projection(d3.geo.mercator());
        d3.select('#ejemplo-e01').data([data.features]).call(map);
    });

    // Equirectangular
    d3.select('#boton-re').on('click', function() {
        map.projection(d3.geo.equirectangular());
        d3.select('#ejemplo-e01').data([data.features]).call(map);
    });

    // Ortographic
    d3.select('#boton-ro').on('click', function() {
        map.projection(d3.geo.orthographic().clipAngle(90));
        d3.select('#ejemplo-e01').data([data.features]).call(map);
    });

    // Conic Equidistant
    d3.select('#boton-rc').on('click', function() {
        map.projection(d3.geo.conicEquidistant()).scale(0.75 * map.width() / (2 * Math.PI));
        d3.select('#ejemplo-e01').data([data.features]).call(map);
    });

});
</div>
<script>codeBlock().editor('#code-e05').init();</script>

<div class="ejemplo">

    <div class="btn-group btn-group-sm">
        <button id="boton-rm" type="button" class="btn btn-default btn-sm">Mercator</button>
        <button id="boton-re" type="button" class="btn btn-default btn-sm">Equirectangular</button>
        <button id="boton-ro" type="button" class="btn btn-default btn-sm">Orthographic</button>
        <button id="boton-rc" type="button" class="btn btn-default btn-sm">Conic Equidistant</button>
    </div>

    <div id="ejemplo-e01"></div>
</div>

### Agregando Interacción

Ahora que sabemos usar proyecciones y generar formas, podemos usar lo que sabemos de SVG para agregar un poco de interactividad al mapa. Empezamos definiendo algunos parámetros para nuestro mapa


<div class="runnable" id="code-g01">
// Parametros del mapa
var width  = 600,
    height = 300,
    zoomScale = 16,
    centerX = width / 2,
    centerY = height / 2;

// Proyección
var projection = d3.geo.equirectangular()
    .scale(width / (2 * Math.PI))
    .translate([centerX, centerY]);

// Generador de paths
var pathGenerator = d3.geo.path()
    .projection(projection);
</div>
<script>codeBlock().editor('#code-g01').init();</script>

Ahora cargamos el archivo GeoJSON con los datos del mundo. Esta vez, vamos a agregar un grupo que va a contener los _features_. Agregaremos un listener para el evento `click` en los features. El callback del evento va a trasladar y escalar el grupo de forma que el feature seleccionado quede centrado. Al hacer click de nuevo, el mapa vuelve a su estado original.

<div class="runnable" id="code-e02">
d3.json('/src/data/countries.geojson', function(error, data) {

    // Data binding
    var div = d3.select('#ejemplo-e02'),
        svg = div.selectAll('svg').data([data.features]);

    svg.enter().append('svg');

    svg.attr('width', width).attr('height', height);

    svg.exit().remove();

    // Creamos el grupo contenedor
    var gCountries = svg.selectAll('g.countries').data([data.features]);

    gCountries.enter().append('g')
        .classed('countries', true);

    gCountries.exit().remove();

    // Creamos los features dentro del grupo
    var pathCountries = gCountries.selectAll('path.country').data(data.features);

    pathCountries.enter().append('path')
        .classed('country', true);

    // Al hacer click, centramos y escalamos el grupo, o lo restablecemos
    // según corresponda
    pathCountries
        .on('click', function(d) {
            // Agregamos el atributo `_centered` a cada feature.
            d._centered = !d._centered;

            // El atributo `_centered` es falso para todos, excepto el feature seleccionado
            pathCountries.each(function(u) {
                if (u !== d) { u._centered = false; }
            });

            // Asignamos la clase `centered` sólo al feature seleccionado
            pathCountries.classed('centered', false);
            d3.select(this).classed('centered', d._centered);

            if (d._centered) {
                // Calculamos el centroide del feature (lon, lat) y
                // calculamos la proyección del centro en pixeles
                var centerCoords = d3.geo.centroid(d),
                    centerPixels = projection(centerCoords);

                // Transladamos y escalamos el grupo adecuadamente. Notar que
                // las operaciones no son conmutativas
                gCountries.transition().duration(2000)
                    .attr('transform', function() {
                        var dx = centerX - zoomScale * centerPixels[0],
                            dy = centerY - zoomScale * centerPixels[1];
                        var t = 'translate(' + [dx, dy] + ')',
                            s = 'scale(' + zoomScale + ')';
                        return t + s;
                    });

            } else {
                // Restablecemos la transformación del grupo
                gCountries.transition().duration(1500).attr('transform', '');
            }

        });

    pathCountries.attr('d', pathGenerator);

    pathCountries.exit().remove();
});
</div>
<script>codeBlock().editor('#code-e02').init();</script>

<div class="ejemplo">
    <div id="ejemplo-e02"></div>
</div>
