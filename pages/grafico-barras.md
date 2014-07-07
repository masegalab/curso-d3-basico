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

Ahora que sabemos sobre D3 y data binding, podemos usar elementos del DOM para crear gráficos. Por ejemplo, podemos crear un gráfico de barras usando contenedores. Supongamos que tenemos los siguientes datos:

<div class="runnable" id="code-f00">
    <textarea class="form-control">

        var data = [
            {country: 'Argentina',  life: 76.01, population:  41086927,  gdp:  14679.92524},
            {country: 'Bolivia',    life: 66.92, population:  10496285,  gdp:   2575.683695},
            {country: 'Brazil',     life: 73.61, population: 198656019,  gdp:  11319.97371},
            {country: 'Chile',      life: 79.57, population:  17464814,  gdp:  15245.468},
            {country: 'Colombia',   life: 73.77, population:  47704427,  gdp:   7762.970829},
            {country: 'Ecuador',    life: 76.19, population:  15492264,  gdp:   5424.633611},
            {country: 'Guatemala',  life: 71.66, population:  15082831,  gdp:   3340.782301},
            {country: 'Paraguay',   life: 72.19, population:   6687361,  gdp:   3680.232059},
            {country: 'Peru',       life: 74.51, population:  29987800,  gdp:   6423.814308},
            {country: 'Uruguay',    life: 76.90, population:   3395253,  gdp:  14727.72564},
            {country: 'Venezuela',  life: 74.48, population:  29954782,  gdp:  12728.72638}
        ];
    </textarea>
</div>
<script>runnable().source('#code-f00').target('#example-f01').init();</script>

Vamos a crear un gráfico de barras usando contenedores. Podemos alterar el tamaño y background de los contenedores alterando los correspondientes atributos de estilo.

<div class="ejemplo">
    <div id="example-f01">
    </div>
</div>

<div class="runnable" id="code-f01">
    <textarea class="form-control">
        // Data binding
        var divs = d3.select('#example-f01').selectAll('div')
            .data(data, function(d) { return d.country; });

        // Enter
        divs.enter().append('div').style('height', '20px')
            .style('margin-bottom', '1px')
            .style('background-color', '#ccc')
            .html(function(d) { return d.country; });

        // Update
        divs.style('width', function(d) { return (2 * d.life) + 'px'; });

        // Exit
        divs.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-f01').target('#example-f01').init();</script>

Podemos actualizar la selección, para usar `d.b` en vez de `d.a` para calcular el ancho de los contenedores. Esta vez, en vez de actualizar el valor directamente, usaremos una transición, que hará que el ancho de actualice más suavemente.

<div class="runnable" id="code-f02">
    <textarea class="form-control">
        // Update con transicion
        divs.transition().duration(1000)
            .style('width', function(d) { return (d.gdp / 100) + 'px'; });
    </textarea>
</div>
<script>runnable().source('#code-f02').target('#example-f01').init();</script>

