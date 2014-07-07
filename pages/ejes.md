---
layout: seccion
title: Ejes
parent:
    url: pages/introduccion-d3
    title: Introducción a D3
prev:
    url: pages/escalas
    title: Escalas
next:
    url: pages/next
    title: Next
---

La mayoría de los gráficos tiene ejes para dar contexto a las cantidades mostradas. Siguiendo con el ejemplo anterior, podríamos agregar un eje horizontal en vez (o además) de mostrar la cantidad graficada junto a las barras.

<div class="runnable" id="code-a01">
    <textarea class="form-control">
        var data = [
            {nombre: 'Manzana',     color: 'red',    calorias:  52, grasa: 0.2, proteinas:  0.3},
            {nombre: 'Hamburguesa', color: 'brown',  calorias: 295, grasa: 14,  proteinas: 17},
            {nombre: 'Pizza',       color: 'yellow', calorias: 266, grasa: 10,  proteinas: 11},
            {nombre: 'Palta',       color: 'green',  calorias: 160, grasa: 15,  proteinas:  2}
        ];
    </textarea>
</div>
<script>runnable().source('#code-a01').target('#example-a02').init();</script>

Por brevedad, vamos a crear los ejes sin los rectángulos y etiquetas. Partiremos creando el elemento SVG.

<div class="runnable" id="code-a02">
    <textarea class="form-control">
        var svg = d3.select('#example-a02').append('svg')
            .attr('width', 600)
            .attr('height', 100)
            .attr('id', 'svg-ejemplo-a02');
    </textarea>
</div>
<script>runnable().source('#code-a02').target('#example-a02').init();</script>

<div class="ejemplo">
    <div id="example-a02"></div>
</div>

Para ubicar los ejes en el gráfico, es necesario crear un _grupo_ y trasladarlo a donde queremos los ejes. En este caso, podremos el eje abajo de donde irían las barras.

<div class="runnable" id="code-a03">
    <textarea class="form-control">
        // Data binding para el grupo
        var gAxis = svg.selectAll('g.eje').data([data]);

        // Creación del grupo en enter
        gAxis.enter().append('g').attr('class', 'eje');

        // Se traslada el grupo
        gAxis.attr('transform', 'translate(200, 80)');
    </textarea>
</div>
<script>runnable().source('#code-a03').init();</script>

Un grupo es un contenedor de elementos de SVG que no tiene representación gráfica. Tampoco tiene posición, pero se le aplicar transformaciones como translación, y escalado. La posición de los elementos de un grupo es relativa al origen del grupo.

D3 tiene una función para generar automáticamente las líneas, ticks y etiquetas que componen un eje. Para crear el eje, D3 necesita tener acceso a la escala que se graficar. Definimos la escala y la función de acceso a la variable que queremos graficar:

<div class="runnable" id="code-a04">
    <textarea class="form-control">
        // Función de acceso
        var valor = function(d) { return d.proteinas; };

        // Escala
        var xScale = d3.scale.linear()
            .domain([0, d3.max(data, valor)])
            .range([0, 360]);
    </textarea>
</div>
<script>runnable().source('#code-a04').init();</script>

Ahora, definimos el _generador de ejes_, configurando la escala y la orientación de los ticks y etiquetas.

<div class="runnable" id="code-a05">
    <textarea class="form-control">
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom');

        gAxis.call(xAxis);
    </textarea>
</div>
<script>runnable().source('#code-a05').init();</script>

<div class="ejemplo">
  <svg height="100px">
    <use xlink:href="#svg-ejemplo-a02" />
  </svg>
</div>

La mayoría de los browsers, los fonts y valores por defecto para líneas en SVG son poco estéticos, pero podemos resolver esto agregando estilos para los elementos que componen los ejes.

<div>
    <style>
            .eje path, line {
                fill: none;
                stroke: black;
                stroke-width: 1px;
            }

            .eje text {
                fill: black;
                font-size: 11px;
            }
    </style>
</div>

<div class="runnable" id="code-a05">
    <textarea class="form-control" rows="12">
<style>
    .eje path, line {
        fill: none;
        stroke: black;
        stroke-width: 1px;
    }

    .eje text {
        fill: black;
        font-size: 12px;
    }
</style></textarea>
</div>


## Recapitulando

<div class="runnable" id="code-b01">
    <textarea class="form-control">
        var svg2 = d3.select('#svg2');

        // Data binding para el grupo
        var gAxis = svg2.selectAll('g.eje').data([data]);

        // Creación del grupo en enter
        gAxis.enter().append('g').attr('class', 'eje');

        // Se traslada el grupo
        gAxis.attr('transform', 'translate(200, 80)');
    </textarea>
</div>
<script>runnable().source('#code-b01').init();</script>

<div class="ejemplo">
  <svg height="100px" width="600px" id="svg2">
  </svg>
</div>


<div class="runnable" id="code-b02">
    <textarea class="form-control">
        // Función de acceso
        var valor = function(d) { return d.proteinas; };

        // Escala
        var xScale = d3.scale.linear()
            .domain([0, d3.max(data, valor)])
            .range([0, 360]);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom');

        gAxis.call(xAxis);

        // Rectángulos
        var rect = svg2.selectAll('rect').data(data);

        rect.enter().append('rect')
            .attr('x', 200)
            .attr('y', function(d, i) { return 20 * i; })
            .attr('width', 0)
            .attr('height', 20 - 2)
            .attr('fill', 'yellow');

        rect.transition().duration(2000)
            .attr('width', function(d) { return xScale(valor(d)); });

        rect.exit().remove();

        // Etiquetas
        var labels = svg2.selectAll('text.label').data(data);

        labels.enter().append('text')
            .attr('class', 'label')
            .attr('x', 190)
            .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
            .attr('text-anchor', 'end')
            .text(function(d) { return d.nombre; });

        labels.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-b02').init();</script>

En la próxima sección, vamos a encapsular este código para poder reusarlo.
