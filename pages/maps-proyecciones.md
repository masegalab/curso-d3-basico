---
layout: seccion
title: GeoJSON y Proyecciones
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

### GeoJSON

<div class="runnable" id="code-b02">
var belgicaFeature = {
      "type": "Feature",
      "properties": {
        "scalerank": 1,
        "featurecla": "Admin-0 country",
        "labelrank": 2.0,
        "sovereignt": "Belgium",
        "sov_a3": "BEL",
        "adm0_dif": 0.0,
        "level": 2.0,
        "type": "Sovereign country",
        "admin": "Belgium",
        "adm0_a3": "BEL",
        "geou_dif": 0.0,
        "geounit": "Belgium",
        "gu_a3": "BEL",
        "su_dif": 0.0,
        "subunit": "Belgium",
        "su_a3": "BEL",
        "brk_diff": 0.0,
        "name": "Belgium",
        "name_long": "Belgium",
        "brk_a3": "BEL",
        "brk_name": "Belgium",
        "brk_group": null,
        "abbrev": "Belg.",
        "postal": "B",
        "formal_en": "Kingdom of Belgium",
        "formal_fr": null,
        "note_adm0": null,
        "note_brk": null,
        "name_sort": "Belgium",
        "name_alt": null,
        "mapcolor7": 3.0,
        "mapcolor8": 2.0,
        "mapcolor9": 1.0,
        "mapcolor13": 8.0,
        "pop_est": 10414336.0,
        "gdp_md_est": 389300.0,
        "pop_year": -99.0,
        "lastcensus": 2011.0,
        "gdp_year": -99.0,
        "economy": "2. Developed region: nonG7",
        "income_grp": "1. High income: OECD",
        "wikipedia": -99.0,
        "fips_10": null,
        "iso_a2": "BE",
        "iso_a3": "BEL",
        "iso_n3": "056",
        "un_a3": "056",
        "wb_a2": "BE",
        "wb_a3": "BEL",
        "woe_id": -99.0,
        "adm0_a3_is": "BEL",
        "adm0_a3_us": "BEL",
        "adm0_a3_un": -99.0,
        "adm0_a3_wb": -99.0,
        "continent": "Europe",
        "region_un": "Europe",
        "subregion": "Western Europe",
        "region_wb": "Europe & Central Asia",
        "name_len": 7.0,
        "long_len": 7.0,
        "abbrev_len": 5.0,
        "tiny": -99.0,
        "homepart": 1.0
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4.816015625000034,
              51.432812499999955
            ],
            [
              4.820703125000023,
              51.412060546875011
            ],
            [
              4.84804687500008,
              51.403271484374983
            ],
            [
              4.943945312499977,
              51.407763671875017
            ],
            [
              4.992578125000023,
              51.445361328125045
            ],
            [
              5.03095703125004,
              51.469091796874977
            ],
            [
              5.05947265625008,
              51.453125
            ],
            [
              5.073437500000068,
              51.406835937500006
            ],
            [
              5.099902343750045,
              51.34648437499996
            ],
            [
              5.214160156250045,
              51.278955078124966
            ],
            [
              5.310839843750045,
              51.259716796874955
            ],
            [
              5.429785156250034,
              51.272998046875017
            ],
            [
              5.476855468750017,
              51.285058593749966
            ],
            [
              5.508789062500028,
              51.275
            ],
            [
              5.540429687499994,
              51.239306640624989
            ],
            [
              5.60878906250008,
              51.198437500000011
            ],
            [
              5.752343750000023,
              51.16948242187496
            ],
            [
              5.796484375000034,
              51.153076171875
            ],
            [
              5.827148437500057,
              51.125634765624994
            ],
            [
              5.818261718750023,
              51.08642578125
            ],
            [
              5.749804687500017,
              50.98876953125
            ],
            [
              5.740820312500063,
              50.959912109374983
            ],
            [
              5.75,
              50.950244140624989
            ],
            [
              5.736621093750017,
              50.932128906250028
            ],
            [
              5.647558593750063,
              50.866650390625011
            ],
            [
              5.639453125000017,
              50.843603515625006
            ],
            [
              5.669140625000011,
              50.805957031249989
            ],
            [
              5.693554687500011,
              50.774755859375006
            ],
            [
              5.69453125000004,
              50.78105468749996
            ],
            [
              5.830957031250051,
              50.809130859375017
            ],
            [
              5.89246112249532,
              50.752556857983507
            ],
            [
              5.993945312500017,
              50.75043945312504
            ],
            [
              6.005957031249977,
              50.73222656249996
            ],
            [
              6.119433593750017,
              50.679248046875017
            ],
            [
              6.15449218750004,
              50.637255859374989
            ],
            [
              6.235937500000034,
              50.596679687499972
            ],
            [
              6.168457031250057,
              50.545361328125011
            ],
            [
              6.1787109375,
              50.52250976562496
            ],
            [
              6.20302734375008,
              50.499121093750006
            ],
            [
              6.294921875000057,
              50.485498046874966
            ],
            [
              6.340917968750006,
              50.451757812500034
            ],
            [
              6.343652343750051,
              50.400244140625006
            ],
            [
              6.364453125000011,
              50.316162109375028
            ],
            [
              6.175097656250074,
              50.232666015624972
            ],
            [
              6.12128906250004,
              50.139355468749983
            ],
            [
              6.116503906250045,
              50.120996093749966
            ],
            [
              6.110058593750068,
              50.123779296875
            ],
            [
              6.08906250000004,
              50.15458984374996
            ],
            [
              6.054785156249977,
              50.154296875
            ],
            [
              5.976269531250068,
              50.167187499999955
            ],
            [
              5.866894531250068,
              50.082812500000017
            ],
            [
              5.817382812500028,
              50.012695312500028
            ],
            [
              5.7880859375,
              49.961230468750017
            ],
            [
              5.744042968749994,
              49.919628906249983
            ],
            [
              5.73525390625008,
              49.875634765624994
            ],
            [
              5.740820312500063,
              49.857177734375057
            ],
            [
              5.725781250000011,
              49.833349609374977
            ],
            [
              5.725,
              49.80830078125004
            ],
            [
              5.78798828125008,
              49.758886718750006
            ],
            [
              5.8037109375,
              49.732177734374972
            ],
            [
              5.880371093749972,
              49.644775390625028
            ],
            [
              5.856542968750006,
              49.612841796875017
            ],
            [
              5.837597656250068,
              49.578320312499983
            ],
            [
              5.815429687499972,
              49.553808593750063
            ],
            [
              5.789746093749983,
              49.538281250000011
            ],
            [
              5.71044921875,
              49.539208984375023
            ],
            [
              5.610058593750068,
              49.528222656249994
            ],
            [
              5.542382812500051,
              49.51103515624996
            ],
            [
              5.50732421875,
              49.510888671875023
            ],
            [
              5.434667968750034,
              49.554492187500017
            ],
            [
              5.353515625000028,
              49.619824218750011
            ],
            [
              5.301953125000011,
              49.650976562500034
            ],
            [
              5.27880859375,
              49.67792968750004
            ],
            [
              5.215039062500068,
              49.689257812500017
            ],
            [
              5.124121093750006,
              49.721484375000017
            ],
            [
              5.061035156250028,
              49.756542968749983
            ],
            [
              5.006933593750034,
              49.778369140624989
            ],
            [
              4.930566406250023,
              49.789257812499983
            ],
            [
              4.867578125000051,
              49.788134765625017
            ],
            [
              4.849121093750028,
              49.84711914062504
            ],
            [
              4.841503906250068,
              49.914501953125011
            ],
            [
              4.790039062499972,
              49.959570312500034
            ],
            [
              4.86054687500004,
              50.135888671874994
            ],
            [
              4.818652343750045,
              50.153173828125034
            ],
            [
              4.772851562500023,
              50.1390625
            ],
            [
              4.706640625000034,
              50.097070312499966
            ],
            [
              4.675097656250017,
              50.046875
            ],
            [
              4.656152343750051,
              50.002441406249972
            ],
            [
              4.545019531250063,
              49.960253906249989
            ],
            [
              4.36875,
              49.944970703124994
            ],
            [
              4.176074218750045,
              49.960253906249989
            ],
            [
              4.149316406250023,
              49.971582031249994
            ],
            [
              4.137011718750074,
              49.984472656250034
            ],
            [
              4.136816406250034,
              50.0
            ],
            [
              4.150292968750023,
              50.023876953124983
            ],
            [
              4.183886718750045,
              50.052832031250034
            ],
            [
              4.192187500000045,
              50.094140625
            ],
            [
              4.157714843750028,
              50.1298828125
            ],
            [
              4.13525390625,
              50.143798828125
            ],
            [
              4.144140625000034,
              50.17841796875004
            ],
            [
              4.169628906250068,
              50.221777343749977
            ],
            [
              4.174609375000017,
              50.246484375000051
            ],
            [
              4.044140624999983,
              50.321337890625017
            ],
            [
              3.949707031250028,
              50.335937499999972
            ],
            [
              3.858105468750011,
              50.338574218749983
            ],
            [
              3.788574218750057,
              50.346972656249989
            ],
            [
              3.748046875000057,
              50.343505859375
            ],
            [
              3.718847656250063,
              50.321679687499994
            ],
            [
              3.689355468750023,
              50.306054687500023
            ],
            [
              3.667285156250045,
              50.324804687500006
            ],
            [
              3.626757812500045,
              50.457324218750017
            ],
            [
              3.595410156250068,
              50.477343749999989
            ],
            [
              3.47695312500008,
              50.499462890624983
            ],
            [
              3.316210937500017,
              50.507373046874989
            ],
            [
              3.27333984375008,
              50.531542968750017
            ],
            [
              3.249804687500074,
              50.591162109375006
            ],
            [
              3.234960937499977,
              50.662939453124977
            ],
            [
              3.182031250000051,
              50.731689453125028
            ],
            [
              3.154882812500006,
              50.748925781249994
            ],
            [
              3.10683593750008,
              50.779443359374994
            ],
            [
              3.022851562500023,
              50.766894531250017
            ],
            [
              2.921972656250006,
              50.727050781249972
            ],
            [
              2.862402343750034,
              50.716015624999955
            ],
            [
              2.839746093750023,
              50.711767578124977
            ],
            [
              2.759375,
              50.750634765624994
            ],
            [
              2.669140625000011,
              50.811425781250023
            ],
            [
              2.596777343750006,
              50.875927734375011
            ],
            [
              2.579296874999983,
              50.911767578125051
            ],
            [
              2.60146484375008,
              50.955273437500011
            ],
            [
              2.574804687500063,
              50.98857421874996
            ],
            [
              2.536035156250051,
              51.04951171875004
            ],
            [
              2.52490234375,
              51.097119140624955
            ],
            [
              2.96015625000004,
              51.26542968749996
            ],
            [
              3.225195312500034,
              51.351611328125045
            ],
            [
              3.35009765625,
              51.377685546875028
            ],
            [
              3.380078125000068,
              51.291113281250063
            ],
            [
              3.40283203125,
              51.263623046874955
            ],
            [
              3.43251953125008,
              51.245751953125051
            ],
            [
              3.471972656250045,
              51.242236328125045
            ],
            [
              3.51708984375,
              51.263623046874955
            ],
            [
              3.580273437499983,
              51.286181640625017
            ],
            [
              3.681835937500068,
              51.275683593750017
            ],
            [
              3.755664062500017,
              51.25483398437504
            ],
            [
              3.78193359375004,
              51.233203124999989
            ],
            [
              3.83076171875004,
              51.212597656249955
            ],
            [
              3.902050781250011,
              51.207666015625023
            ],
            [
              4.040039062500057,
              51.247070312500057
            ],
            [
              4.17255859375004,
              51.307080078125011
            ],
            [
              4.211425781250057,
              51.348730468749977
            ],
            [
              4.226171875000034,
              51.386474609375028
            ],
            [
              4.304492187500017,
              51.361523437500011
            ],
            [
              4.373730468749983,
              51.356005859375045
            ],
            [
              4.40400390625004,
              51.367089843749994
            ],
            [
              4.384765625000028,
              51.427587890625063
            ],
            [
              4.44091796875,
              51.459814453125063
            ],
            [
              4.503417968750028,
              51.474707031249977
            ],
            [
              4.531640625000023,
              51.448583984374977
            ],
            [
              4.588769531250023,
              51.42192382812496
            ],
            [
              4.633984375000068,
              51.421728515625006
            ],
            [
              4.755664062499989,
              51.491113281250023
            ],
            [
              4.784179687500028,
              51.477392578124977
            ],
            [
              4.810546875,
              51.452734375000034
            ],
            [
              4.816015625000034,
              51.432812499999955
            ]
          ]
        ]
      }
    };
</div>
<script>codeBlock().editor('#code-b02').init()</script>

### Proyecciones

<div class="runnable" id="code-b01">
var arubaFeature = {
  "type": "Feature",
  "properties": {
    "scalerank": 3,
    "featurecla": "Admin-0 country",
    "labelrank": 5.0,
    "sovereignt": "Netherlands",
    "sov_a3": "NL1",
    "adm0_dif": 1.0,
    "level": 2.0,
    "type": "Country",
    "admin": "Aruba",
    "adm0_a3": "ABW",
    "geou_dif": 0.0,
    "geounit": "Aruba",
    "gu_a3": "ABW",
    "su_dif": 0.0,
    "subunit": "Aruba",
    "su_a3": "ABW",
    "brk_diff": 0.0,
    "name": "Aruba",
    "name_long": "Aruba",
    "brk_a3": "ABW",
    "brk_name": "Aruba",
    "brk_group": null,
    "abbrev": "Aruba",
    "postal": "AW",
    "formal_en": "Aruba",
    "formal_fr": null,
    "note_adm0": "Neth.",
    "note_brk": null,
    "name_sort": "Aruba",
    "name_alt": null,
    "mapcolor7": 4.0,
    "mapcolor8": 2.0,
    "mapcolor9": 2.0,
    "mapcolor13": 9.0,
    "pop_est": 103065.0,
    "gdp_md_est": 2258.0,
    "pop_year": -99.0,
    "lastcensus": 2010.0,
    "gdp_year": -99.0,
    "economy": "6. Developing region",
    "income_grp": "2. High income: nonOECD",
    "wikipedia": -99.0,
    "fips_10": null,
    "iso_a2": "AW",
    "iso_a3": "ABW",
    "iso_n3": "533",
    "un_a3": "533",
    "wb_a2": "AW",
    "wb_a3": "ABW",
    "woe_id": -99.0,
    "adm0_a3_is": "ABW",
    "adm0_a3_us": "ABW",
    "adm0_a3_un": -99.0,
    "adm0_a3_wb": -99.0,
    "continent": "North America",
    "region_un": "Americas",
    "subregion": "Caribbean",
    "region_wb": "Latin America & Caribbean",
    "name_len": 5.0,
    "long_len": 5.0,
    "abbrev_len": 5.0,
    "tiny": 4.0,
    "homepart": -99.0
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -69.899121093749997,
          12.452001953124991
        ],
        [
          -69.895703125,
          12.422998046874994
        ],
        [
          -69.942187499999989,
          12.438525390624989
        ],
        [
          -70.004150390625,
          12.50048828125
        ],
        [
          -70.066113281249997,
          12.546972656249991
        ],
        [
          -70.050878906249991,
          12.597070312499994
        ],
        [
          -70.035107421874997,
          12.614111328124991
        ],
        [
          -69.97314453125,
          12.567626953125
        ],
        [
          -69.911816406249997,
          12.48046875
        ],
        [
          -69.899121093749997,
          12.452001953124991
        ]
      ]
    ]
  }
};
</div>
<script>codeBlock().editor('#code-b01').init()</script>

<div class="runnable" id="code-c02">
var projection = d3.geo.equirectangular();

var arubaCoords = arubaFeature.geometry.coordinates[0][0];

var arubaPixels = projection(arubaCoords);
</div>
<script>codeBlock().editor('#code-c02').init();</script>

<script>

var width  = 600,
    height = 600;

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
};

var map = geojsonMap();

d3.json('/src/data/countries.geojson', function(error, data) {

    if (error) { console.error(error); }

    d3.select('#ejemplo-a01')
        .data([data.features])
        .call(map);


    d3.select('#boton-m').on('click', function() {

        map.projection(d3.geo.mercator());

        d3.select('#ejemplo-a01')
            .data([data.features])
            .call(map);

    });

    d3.select('#boton-e').on('click', function() {

        map.projection(d3.geo.equirectangular())
            .height(300);

        d3.select('#ejemplo-a01')
            .data([data.features])
            .call(map);

    });

    d3.select('#boton-o').on('click', function() {

        map.projection(d3.geo.orthographic().clipAngle(90));

        d3.select('#ejemplo-a01')
            .data([data.features])
            .call(map);

    });

    d3.select('#boton-c').on('click', function() {

        map.projection(d3.geo.conicEquidistant())
            .scale(0.75 * width / (2 * Math.PI));

        d3.select('#ejemplo-a01')
            .data([data.features])
            .call(map);

    });

});
</script>

<div class="btn-group btn-group-sm">
    <button id="boton-m" type="button" class="btn btn-default btn-sm">Mercator</button>
    <button id="boton-e" type="button" class="btn btn-default btn-sm">Equirectangular</button>
    <button id="boton-o" type="button" class="btn btn-default btn-sm">Orthographic</button>
    <button id="boton-c" type="button" class="btn btn-default btn-sm">Conic Equidistant</button>
</div>

<div class="ejemplo">
    <div id="ejemplo-a01"></div>
</div>