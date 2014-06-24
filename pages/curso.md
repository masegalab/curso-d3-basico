---
layout: curso
title: Visualización de Datos con D3
---

# {{page.title}}

## Manipulación del DOM con D3

Podemos usar D3 para manipular elementos del DOM (Document Object Model). Por ejemplo, podemos cambiar el color de fondo de un contenedor.

<div>
    <style>
        #block-container {
            display: inline-block;
        }

        .block {
            float: left;
            margin: 20px;
            width: 100px;
            height: 50px;
        }

        #red {
            background-color: red;
        }

        #blue {
            background-color: blue;
        }
    </style>
</div>

<div id='block-container'>
    <div class="block" id="red"></div>
    <div class="block" id="blue"></div>
</div>

Podemos cambiar el color de fondo de un contenedor

    d3.select('#red').style('background-color', 'green');

o podemos cambiar varios elementos al mismo tiempo, seleccionando por clase o por tipo de elemento

    d3.selectAll('.block').style('width', '100px');

DIY:

- Cambiar la altura del contenedor azul.
- Alinear los contenedores a la derecha.
- Escribir algo dentro de un contenedor.

Podemos agregar elementos

<div class="ejemplo">
    <div id="ejemplo02"></div>
</div>

Agregar un elemento `SVG` en el contenedor `#ejemplo02`.

    var svg = d3.select('#ejemplo02').append('svg');

La variable `svg` contiene una referencia al elemento creado. Podemos usar esta referencia para cambiar los atributos del elemento.

    svg.attr('width', 300).attr('height', 100);

Podemos agregar un rectángulo al SVG:

    var rect = svg.append('rect')
        .attr('fill', 'blue')
        .attr('x', 20)
        .attr('y', 20)
        .attr('width', 150)
        .attr('height', 80);

DIY:

- Agregar un circulo `<circle cx=10 cy=10 r=30 fill='#bababa'></circle>`
- También se pueden eliminar elementos del DOM. Por ejemplo, se puede borrar el rectángulo con `rect.remove()`.


## Data Binding

El DOM se puede manipular con varias librerías, por ejemplo, con jQuery. La diferencia con D3, es que los elementos del DOM se pueden asociar a elementos de un array de datos.

<div class="ejemplo">
    <svg id="ejemplo03" width=400 height=200></svg>
</div>

Y buen como iba diciendo...

    var svg = d3.select('#ejemplo03');

    var data = [
        {ancho: 100, color: 'blue'},
        {ancho:  80, color: 'red'},
        {ancho:  60, color: 'yellow'},
        {ancho: 140, color: 'green'}
    ];

    var rect = svg.selectAll('rect').data(data);

    rect.enter().append('rect')
        .attr('y', function(d, i) { return 50 * i; })
        .attr('width', function(d) { return d.ancho; })
        .attr('height', 40)
        .attr('fill', function(d) { return d.color; });

Se pueden actualizar los atributos de los rectángulos

    rect.attr('x', 100);

Si hacemos binding de la misma selección con otro arreglo de datos, los elementos del DOM que tienen datos asociados se actualizan, y los que no, se eliminan. Si hay elementos de dato que no tienen elemento del DOM asociado, se agregan.


<div class="ejemplo">
    <svg id="ejemplo04" width=400 height=200></svg>
</div>

Por ejemplo:

    var svg = d3.select('#ejemplo04');

    var data = [
        {ancho: 100, color: 'blue'},
        {ancho:  80, color: 'red'},
    ];

    var rect = svg.selectAll('rect').data(data);

    // Nuevos rectangulos
    rect.enter().append('rect')
        .attr('x', 0)
        .attr('y', function(d, i) { return 50 * i; })
        .attr('width', function(d) { return d.ancho; })
        .attr('height', 40)
        .attr('fill', 'blue');

    // Update
    rect.transition().duration(1000)
        .attr('x', 100)
        .attr('fill', function(d) { return d.color; });

    // Remove
    rect.exit().transition().duration(1000)
        .attr('x', 500)
        .attr('fill', 'black')
        .remove();

El binding entre elementos graficos y propiedades de los graficos permite crear gráficos y visualizaciones de datos.



