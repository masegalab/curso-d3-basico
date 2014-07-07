---
layout: seccion
title: Escalas y ejes
parent:
    url: pages/introduccion-d3
    title: Introducción a D3
prev:
    url: pages/grafico-barras
    title: Gráfico de barras
next:
    url: pages/ejes
    title: Ejes
---

Recapitulando: tenemos los datos,

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

Creamos el SVG:

<div class="runnable" id="code-a02">
    <textarea class="form-control">
        var svg = d3.select('#example-a02').append('svg')
            .attr('width', 600)
            .attr('height', 80)
            .attr('id', 'svg-ejemplo-a02');
    </textarea>
</div>
<script>runnable().source('#code-a02').target('#example-a02').init();</script>

<div class="ejemplo">
    <div id="example-a02"></div>
</div>

Y agregamos los rectángulos, las etiquetas y los gramos de proteína de cada alimento:

<div class="runnable" id="code-a03">
    <textarea class="form-control">
        // Rectángulos
        var rect = svg.selectAll('rect').data(data);

        rect.enter().append('rect')
            .attr('x', 200)
            .attr('y', function(d, i) { return 20 * i; })
            .attr('width', 0)
            .attr('height', 20 - 2)
            .attr('fill', 'yellow');

        rect.transition().duration(2000)
            .attr('width', function(d) { return d.proteinas; });

        rect.exit().remove();

        // Etiquetas
        var labels = svg.selectAll('text.label').data(data);

        labels.enter().append('text')
            .attr('class', 'label')
            .attr('x', 190)
            .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
            .attr('text-anchor', 'end')
            .text(function(d) { return d.nombre; });

        labels.exit().remove();

        // Count
        var count = svg.selectAll('text.count').data(data);

        count.enter().append('text')
            .attr('class', 'count');

        count.transition().delay(2000)
            .attr('x', function(d) { return d.proteinas + 200 + 5; })
            .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
            .attr('fill', 'black')
            .attr('text-anchor', 'start')
            .text(function(d) { return d.proteinas; });

        count.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-a03').target('#example-a02').init();</script>



## Escalas

<div class="ejemplo">
  <svg height="80px">
    <use xlink:href="#svg-ejemplo-a02" />
  </svg>
</div>

<aside>Para una referencia pedagógica sobre las escalas, consultar la <a href="http://chimera.labs.oreilly.com/books/1230000000345/ch07.html">versión online</a> del libro de Scott Murray 'Interactive Data Visualization for the Web'.</aside>

El resultado es poco satisfactorio, el espacio disponible no es bien utilizado. Lo ideal sería que el rectángulo más grande (17 gramos de proteína) ocupe todo el ancho disponible, y que el resto se escale proporcionalmente. Necesitamos transformar números entre 0 a 17 en números entre 0 y 400 de forma proporcional. Una función que hace esta transformación es una escala lineal.

<aside>Notamos que existen otros tipos de escala que resultan más naturales en diferentes contextos. Referimos a la <a href="https://github.com/mbostock/d3/wiki/Quantitative-Scales"> documentación</a></aside>

D3 provee una función para calcular escalas automáticamente. En nuestro ejemplo, tenemos 400 pixeles disponibles en sentido horizontal y los valores de nuestros datos van desde 0 a 17 gramos de proteína. Los valores de origen son el _dominio_ de la escala, y los valores de destino son el _rango_ de la escala.

<div class="runnable" id="code-b01">
    <textarea class="form-control">
        // Creamos y configuramos una escala lineal
        var escalaAncho = d3.scale.linear()
            .domain([0, 17])
            .range([0, 400]);

        // Probar con otros valores (0, 17, 5)
        var proteinas = 5;
        alert(proteinas + ' equivale a ' + escalaAncho(proteinas) + ' pixeles');
    </textarea>
</div>
<script>runnable().source('#code-b01').init();</script>

Podemos calcular el valor máximo del dominio de la escala usando D3.

<div class="runnable" id="code-b02">
    <textarea class="form-control">
        // Creamos y configuramos una escala lineal
        var maxValor = d3.max(data, function(d) { return d.proteinas; });

        escalaAncho = d3.scale.linear()
            .domain([0, maxValor])
            .range([0, 400]);

        // Probar con otros valores (0, 17, 5)
        var proteinas = 5;
        alert(proteinas + ' equivale a ' + escalaAncho(proteinas) + ' pixeles');
    </textarea>
</div>
<script>runnable().source('#code-b02').init();</script>

## Actualizando nuestro ejemplo

<div class="runnable" id="code-b03">
    <textarea class="form-control">
        var xScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.proteinas; })])
            .range([0, 400]);
    </textarea>
</div>
<script>runnable().source('#code-b03').init();</script>

<div class="ejemplo">
  <svg height="80px">
    <use xlink:href="#svg-ejemplo-a02" />
  </svg>
</div>

<div class="runnable" id="code-b04">
    <textarea class="form-control">
        // Rectángulos
        var rect = svg.selectAll('rect').data(data);

        rect.enter().append('rect')
            .attr('x', 200)
            .attr('y', function(d, i) { return 20 * i; })
            .attr('width', 0)
            .attr('height', 20 - 2)
            .attr('fill', 'yellow');

        rect.transition().duration(2000)
            .attr('width', function(d) { return xScale(d.proteinas); });

        rect.exit().remove();

        // Etiquetas
        var labels = svg.selectAll('text.label').data(data);

        labels.enter().append('text')
            .attr('class', 'label')
            .attr('x', 190)
            .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
            .attr('text-anchor', 'end')
            .text(function(d) { return d.nombre; });

        labels.exit().remove();

        // Count
        var count = svg.selectAll('text.count').data(data);

        count.enter().append('text')
            .attr('class', 'count');

        count.transition().delay(2000)
            .attr('x', function(d) { return xScale(d.proteinas) + 200 + 5; })
            .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
            .attr('fill', 'black')
            .attr('text-anchor', 'start')
            .text(function(d) { return d.proteinas; });

        count.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-b04').init();</script>

Notar que necesitamos dejar espacio para la etiqueta de los gramos de proteína del valor máximo. Vamos a redefinir la escala, cambiando el rango a `[0, 360]`.

<div class="runnable" id="code-b05">
    <textarea class="form-control">
        xScale.range([0, 360]);
    </textarea>
</div>
<script>runnable().source('#code-b05').init();</script>

Si volvemos a ejecutar el código que actualiza las barras, totas las etiquetas serán visibles.

Podemos hacer el código un poco más general (y compacto) creando una función que retorne la cantidad que queremos graficar, en vez de escribirla varias veces. Vamos a definir la función `valor`:

<div class="runnable" id="code-b06">
    <textarea class="form-control">
        // Función de acceso a la variable a graficar
        var valor = function(d) { return d.proteinas; };

        // Usamos la función de acceso para definir la escala
        var xScale = d3.scale.linear()
            .domain([0, d3.max(data, valor)])
            .range([0, 360]);
    </textarea>
</div>
<script>runnable().source('#code-b06').init();</script>

Ahora el código que actualiza el gráfico se puede modificar rápidamente para graficar otra variable.

<div class="ejemplo">
  <svg height="80px">
    <use xlink:href="#svg-ejemplo-a02" />
  </svg>
</div>

<div class="runnable" id="code-b07">
    <textarea class="form-control">
        // Rectángulos
        var rect = svg.selectAll('rect').data(data);

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
        var labels = svg.selectAll('text.label').data(data);

        labels.enter().append('text')
            .attr('class', 'label')
            .attr('x', 190)
            .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
            .attr('text-anchor', 'end')
            .text(function(d) { return d.nombre; });

        labels.exit().remove();

        // Count
        var count = svg.selectAll('text.count').data(data);

        count.enter().append('text')
            .attr('class', 'count');

        count.transition().delay(2000)
            .attr('x', function(d) { return xScale(valor(d)) + 200 + 5; })
            .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
            .attr('fill', 'black')
            .attr('text-anchor', 'start')
            .text(function(d) { return valor(d); });

        count.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-b07').init();</script>

Notar que este código es bastante general, no hace referencia a proteínas ni calorías ni grasa, lo único que hace referencia a la estructura de los datos originales es el texto de la etiqueta. Para hacer más general este campo, podríamos reemplazarlo por una función `var etiqueta = function(d) { return d.nombre; }`.
