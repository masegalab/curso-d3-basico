---
layout: seccion
title: Gráfico de Barras
parent:
    url: pages/introduccion-d3.html
    title: Introducción a D3
prev:
    url: pages/data-binding.html
    title: Data Binding
next:
    url: pages/escalas.html
    title: Escalas
---

Ahora que sabemos sobre SVG y data binding, podemos crear un gráfico de barras. Vamos a usar el siguiente arreglo de datos para crear nuestro gráfico. Vamos a partir graficando la cantidad de calorías de cada alimento.

<div class="runnable" id="code-a01">
var data = [
    {nombre: 'Manzana',     color: 'red',    calorias:  52, grasa: 0.2, proteinas:  0.3},
    {nombre: 'Hamburguesa', color: 'brown',  calorias: 295, grasa: 14,  proteinas: 17},
    {nombre: 'Pizza',       color: 'yellow', calorias: 266, grasa: 10,  proteinas: 11},
    {nombre: 'Palta',       color: 'green',  calorias: 160, grasa: 15,  proteinas:  2}
];
</div>
<script>codeBlock().editor('#code-a01').init();</script>


Vamos a crear un elemento SVG y definir su tamaño.

<div class="runnable" id="code-a02">
var svg = d3.select('#example-a02').append('svg')
    .attr('width', 600)
    .attr('height', 80)
    .attr('id', 'svg-ejemplo-a02');
</div>
<script>codeBlock().editor('#code-a02').init();</script>

<div class="ejemplo">
    <div id="example-a02"></div>
</div>

Ahora creamos la selección para los rectángulos, vinculando los rectángulos al arreglo de datos. Vamos a usar la misma secuencia que en el ejemplo de la [sección previa]({{site.page.root}}/{{page.prev.url}}).

<div class="runnable" id="code-a03">
// Data binding
var rect = svg.selectAll('rect').data(data);

// Agregamos los rectángulos a la selección enter.
rect.enter().append('rect')
    .attr('x', 200)
    .attr('y', function(d, i) { return 20 * i; })
    .attr('width', 0)
    .attr('height', 20 - 2)
    .attr('fill', 'blue');

// Actualizamos los atributos de los rectángulos
rect.transition().duration(2000)
    .attr('width', function(d) { return d.calorias; });

// Eliminamos los rectángulos sin datos
rect.exit().remove();
</div>
<script>codeBlock().editor('#code-a03').init();</script>

<aside>La función _transition_ es bastante flexible, pero tiene menos funcionalidad que una selección sin transiciones. Consultar la <a href="https://github.com/mbostock/d3/wiki/Transitions">documentación</a>.</aside>

Notar que en este caso, no necesitamos remover elementos, pero es buena práctica remover los elementos de la selección exit para cuando queramos revincular la selección a otro conjunto de datos.

Podemos agregar etiquetas a cada rectángulo. Vamos a poner el nombre de cada categoría alineado a la izquierda de cada rectángulo.

<div class="runnable" id="code-a04">
// Data binding
var labels = svg.selectAll('text.label').data(data);

// Agrega las etiquetas a la selección enter
labels.enter().append('text')
    .attr('class', 'label')
    .attr('x', 190)
    .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
    .attr('text-anchor', 'end')
    .text(function(d) { return d.nombre; });

// Elimina las etiquetas en exit
labels.exit().remove();
</div>
<script>codeBlock().editor('#code-a04').init();</script>

<div class="ejemplo">
  <svg height="80px">
    <use xlink:href="#svg-ejemplo-a02" />
  </svg>
</div>

Además, vamos a poner el número de calorías de cada barra dentro de la barra.

<div class="runnable" id="code-a05">
// Data binding
var count = svg.selectAll('text.count').data(data);

// Agrega las etiquetas a la selección enter
count.enter().append('text')
    .attr('class', 'count')
    .attr('x', function(d) { return d.calorias + 200 - 5; })
    .attr('y', function(d, i) { return 20 * (i + 1) - 5; })
    .attr('fill', 'white')
    .attr('text-anchor', 'end')
    .text(function(d) { return d.calorias; });

// Elimina las etiquetas en exit
count.exit().remove();
</div>
<script>codeBlock().editor('#code-a05').init();</script>

### Graficando Otra Variable

Podemos actualizar los atributos de las selecciones existentes para graficar otra variable de cada alimento. Por ejemplo, podemos graficar el contenido de proteína.

<div class="runnable" id="code-b01">
// Actualizamos el ancho y color de los rectángulos
rect.transition().duration(2000)
    .attr('fill', 'yellow')
    .attr('width', function(d) { return d.proteinas; });

// Actualiza la posición del count con transición
count.transition().duration(2000)
    .attr('x', function(d) { return d.proteinas + 200 + 5; });

// Actualiza otros atributos instantáneamente
count
    .attr('fill', 'black')
    .attr('text-anchor', 'start')
    .text(function(d) { return d.proteinas; });
</div>
<script>codeBlock().editor('#code-b01').init();</script>

<div class="ejemplo">
  <svg height="80px">
    <use xlink:href="#svg-ejemplo-a02" />
  </svg>
</div>

En este ejemplo, usamos el valor de cada variable (calorías y proteínas) para determinar el largo de los rectángulos. Normalmente, esto no es muy práctico, ya que las barras podrían quedar muy chicas o muy grandes. Para optimizar el uso del espacio, podemos usar escalas, que son el tópico de la [próxima sección]({{site.page.root}}/{{page.next.url}}).
