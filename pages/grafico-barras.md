---
layout: seccion
title: Gráfico de barras
parent:
    url: pages/introduccion-d3
    title: Introducción a D3
prev:
    url: pages/data-binding
    title: Data binding
next:
    url: pages/next
    title: Next
---

Ahora que sabemos sobre SVG y data binding, podemos crear un gráfico de barras. Vamos a usar el siguiente arreglo de datos para crear nuestro gráfico.

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

Vamos a crear un elemento SVG y usar la estructura de la sección anterior para crear los rectángulos del gráfico.

<div class="runnable" id="code-a02">
    <textarea class="form-control">
        var svg = d3.select('#example-a02').append('svg')
            .attr('width', 600)
            .attr('height', 80);
    </textarea>
</div>
<script>runnable().source('#code-a02').target('#example-a02').init();</script>

<div class="ejemplo">
    <div id="example-a02"></div>
</div>

Ahora creamos la selección para los rectángulos, vinculando los rectángulos al arrelgo de datos.

<div class="runnable" id="code-a03">
    <textarea class="form-control">
        var rect = svg.selectAll('rect').data(data);

        rect.enter().append('rect')
            .attr('x', 200)
            .attr('y', function(d, i) { return 20 * i; })
            .attr('width', 0)
            .attr('height', 20 - 2)
            .attr('fill', 'blue');

        rect.transition().duration(2000)
            .attr('width', function(d) { return d.calorias; });

        rect.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-a03').target('#example-a02').init();</script>

Podemos agregar etiquetas a cada rectángulo. Vamos a poner el nombre de cada categoría alineado a la izquierda de cada rectángulo.

<div class="runnable" id="code-a04">
    <textarea class="form-control">
        var labels = svg.selectAll('text.label').data(data);

        labels.enter().append('text')
            .attr('class', 'label')
            .attr('x', 190)
            .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
            .attr('text-anchor', 'end')
            .text(function(d) { return d.nombre; });

        labels.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-a04').target('#example-a02').init();</script>

Además, vamos a poner el número de calorías de cada barra dentro de la barra.

<div class="runnable" id="code-a04">
    <textarea class="form-control">
        var count = svg.selectAll('text.count').data(data);

        labels.enter().append('text')
            .attr('class', 'count')
            .attr('x', function(d) { return d.calorias + 200 - 5; })
            .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
            .attr('fill', 'white')
            .attr('text-anchor', 'end')
            .text(function(d) { return d.calorias; });

        labels.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-a04').target('#example-a02').init();</script>
