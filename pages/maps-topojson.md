---
layout: seccion
title: El Formato TopoJSON
parent:
    url: pages/maps.html
    title: Mapas
prev:
    url: pages/maps-reusable.html
    title: Mapas Reutilizables
next:
    url: pages/maps-flight-routes.html
    title: Flight Routes
---

El formato GeoJSON es redundante. Los vértices de dos países contiguos están escritos dos veces, y podrían no coincidir exactamente, creando artefactos en el mapa.

Mike Bostock creó el formato TopoJSON, que define formas en términos de _arcos_ (fronteras) entre formas. Esto elimina redundancia y además agrega información de _topología_ de las formas, dos formas que comparten un arco son vecinas. Los archivos TopoJSON usualmente pesan menos del 10% que su contraparte GeoJSON.

https://github.com/mbostock/topojson/wiki

<div class="runnable" id="code-f01">
{
    "type": "Topology",
    "objects": {
        "countries": {
            "type": "GeometryCollection",
            "geometries": [
                {
                    "type": "Polygon",
                    "properties": {
                        "admin": "Aruba",
                        "continent": "North America",
                        "sov_a3": "NL1"
                    },
                    "arcs": [[0]]
                },
                {
                    // other geometries...
                }
            ]
        }
    },
    "arcs": [
        [
            [3058, 5901],
            [   0,   -2],
            [  -1,    1],
            [  -2,    4],
            [  -2,    2],
            [   1,    3],
            [   0,    1],
            [   2,   -2],
            [   2,   -5],
            [   0,   -2]
        ],
        [
            // other arcs...
        ]
    ],
    "transform": {
        "scale": [
            0.036003600360036005,
            0.01736158967459246
        ],
        "translate": [
            -180,
            -89.99892578124998
        ]
    }
}
</div>
<script>codeBlock().editor('#code-f01').init();</script>


El paquete [TopoJSON](https://github.com/mbostock/topojson) está compuesto de una libería JavaScript y de un programa.

### TopoJSON (Programa)

El programa `topojson` permite convertir archivos GeoJSON en sus equivalentes TopoJSON. Tiene opciones para convertir proyecciones, eliminar o agregar atributos, entre otros. También puede convertir archivos ESRI en TopoJSON directamente.

<div class="runnable" id="code-f02">
// Convierte el archivo countries.geojson a TopoJSON
//  topojson -o countries.topojson -p sov_a3 countries.geojson
</div>
<script>codeBlock().editor('#code-f02').init();</script>

### TopoJSON.js (libería)

La librería TopoJSON convierte objetos en formato TopoJSON en GeoJSON, que puede ser usado para graficar y usar proyecciones. Además de convertir a GeoJSON, la librería TopoJSON permite identificar vecinos de un feature particular.


### Usando el formato TopoJSON



