---
layout: seccion
title: Introducción a D3.js
---

## Manipulación del DOM

## Data binding

D3 vincula elementos del DOM con elementos de datos, aunque los elementos del DOM no existan todavía. Por ejemplo, tenemos tres items en una lista.

<div class="ejemplo">
    <div id="example-b01">
        <ul>
            <li>uno</li>
            <li>dos</li>
            <li>tres</li>
        </ul>
    </div>
</div>

Estos elementos no tienen datos vinculados todavía. Con D3, podemos vincular cada uno de estos elementos con un elemento de un arreglo de datos.

<div class="runnable" id="code-b01">
    <textarea class="form-control">
        // Arreglo de datos de tres elementos
        var data = [
            {texto: 'Talca',   color: 'red'},
            {texto: 'París',   color: 'blue'},
            {texto: 'Londres', color: 'green'}
        ];

        // Seleccionamos el contenedor
        var div = d3.select('#example-b01 ul');

        // Vinculamos los elementos de la lista con los elementos del arreglo
        var list = div.selectAll('li').data(data);
    </textarea>
</div>

<script>runnable().source('#code-b01').target('#example-b01').init();</script>

Los elementos de la lista tienen datos asociados, pero no pasó nada más. Podemos inspeccionar los elementos, y veremos que tienen una nueva propiedad, el attributo `__data__`. Este atributo es una referencia al elemento de dato vinculado a este elemento.

Ahora, podemos usar los datos para modificar los atributos del elemento del DOM. Por ejemplo, podemos cambiar de color, usando el atributo `color` del dato asociado a cada item.


<div class="runnable" id="code-b02">
    <textarea class="form-control">
        // Cambia el color de cada item
        list.style('color', function(d) { return d.color; });
    </textarea>
</div>

<script>runnable().source('#code-b02').target('#example-b01').init();</script>

Dependiendo del tipo de elemento del DOM, se puede usar `attr` para atributos, `style` para propiedades de estilo, `text` o `html` para contenido. Por ejemplo, ahora podemos alterar el contenido del elemento de lista.

<div class="runnable" id="code-b03">
    <textarea class="form-control">
        // Cambia el color de cada item
        list.html(function(d) { return d.texto; });
    </textarea>
</div>

<script>runnable().source('#code-b03').target('#example-b01').init();</script>

### La seleccion `enter()`

Esto funciona bien si los elementos del DOM existen y coinciden con el número de datos. Si hay más datos que elementos del DOM, se crea una selección especial llamada `enter()`. Esta selección tiene elementos del DOM provisionales, que pueden ser creados usando esta selección.

<div class="ejemplo">
    <div id="example-c01">
        <ul>
            <li>uno</li>
            <li>dos</li>
        </ul>
    </div>
</div>

Ahora tenemos dos elementos del DOM, y el mismo arreglo de datos. Podemos vincular los elementos del DOM con los elementos de los datos.

<div class="runnable" id="code-c01">
    <textarea class="form-control">
        // Vinculamos los elementos de la lista con los elementos del arreglo
        var list = d3.select('#example-c01 ul').selectAll('li').data(data);
    </textarea>
</div>

<script>runnable().source('#code-c01').target('#example-c01').init();</script>

La selección `list.enter()` contiene una referencia a los elementos de lista no creados. Podemos usar esta selección para crear los elementos.

<div class="runnable" id="code-c02">
    <textarea class="form-control">
        // Crea un elemento de lista para el elemento de dato sin DOM
        list.enter().append('li')
            .html(function(d) { return d.texto; });
    </textarea>
</div>

<script>runnable().source('#code-c02').target('#example-c01').init();</script>

El nuevo elemento fue creado, y además configuramos su contenido para que use los datos. Notar que el resto de los elementos no ha sido actualizado. Una vez creado el elemento, está disponible en la variable `list`, y puede ser actualizado con el resto de los elementos.

<div class="runnable" id="code-c03">
    <textarea class="form-control">
        // Crea un elemento de lista para el elemento de dato sin DOM
        list
            .style('color', function(d) { return d.color; })
            .html(function(d) { return d.texto; });
    </textarea>
</div>

<script>runnable().source('#code-c03').target('#example-c01').init();</script>

### La selección `exit()`.

También puede ocurrir el caso contrario, que hay más elementos del DOM que elementos de datos. Los elementos restantes quedan almacenados en una selección especial llamada `exit`, que podemos usar para remover los elementos.

<div class="ejemplo">
    <div id="example-d01">
        <ul>
            <li>uno</li>
            <li>dos</li>
            <li>tres</li>
            <li>cuatro</li>
        </ul>
    </div>
</div>

Al vincular cuatro elementos del DOM con tres elementos de datos, un elemento quedará en la selección `exit()`.

<div class="runnable" id="code-d01">
    <textarea class="form-control">
        // Vinculamos los elementos de la lista con los elementos del arreglo
        var list = d3.select('#example-d01 ul').selectAll('li').data(data);
    </textarea>
</div>
<script>runnable().source('#code-d01').target('#example-d01').init();</script>

Podemos usar esa selección para remover el elemento que no tiene datos. Notar que la selección funciona casi igual que el resto, podemos alterar los atributos de los elementos del DOM (pero sin usar datos, porque no tienen).

<div class="runnable" id="code-d02">
    <textarea class="form-control">
        list.exit().style('color', 'yellow');
    </textarea>
</div>
<script>runnable().source('#code-d02').target('#example-d01').init();</script>

También podemos simplemente eliminarlos.

<div class="runnable" id="code-d03">
    <textarea class="form-control">
        list.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-d03').target('#example-d01').init();</script>

Normalmente, el código D3 debe manejar estas tres situaciones, `enter`, update y `exit`. Ejecutando correctamente esta secuencia asegura que los datos y el DOM estén sincronizados.

<div class="ejemplo">
    <div id="example-d02">
        <ul></ul>
    </div>
</div>

<div class="runnable" id="code-d04">
    <textarea class="form-control">
        // Arreglo de datos de tres elementos
        var data = [
            {texto: 'Talca',   color: 'red'},
            {texto: 'París',   color: 'blue'},
            {texto: 'Londres', color: 'green'}
        ];

        var list = d3.select('#example-d02 ul').selectAll('li').data(data);

        // Enter
        list.enter().append('li')
            .html(function(d) { return d.texto; })ñ

        // Update
        list
            .style('color', function(d) { return d.color; });

        // Exit
        list.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-d04').target('#example-d02').init();</script>


### Usando un ID

Hasta ahora, hemos usado la posición de los elementos del DOM y la posición de los elementos en el arreglo para determinar la correspondencia entre ellos. Esto puede generar problemas, por ejemplo, vamos a crear una lista nueva usando datos.

<div class="ejemplo">
    <div id="example-e01">
        <ul></ul>
    </div>
</div>

<div class="runnable" id="code-e01">
    <textarea class="form-control">
        // Arreglo de datos de tres elementos
        var data = [
            {texto: 'Talca',   color: 'red'},
            {texto: 'París',   color: 'blue'},
            {texto: 'Londres', color: 'green'}
        ];

        var list = d3.select('#example-e01 ul').selectAll('li').data(data);

        // Enter
        list.enter().append('li')
            .html(function(d) { return d.texto; });

        // Update
        list
            .style('color', function(d) { return d.color; });

        // Exit
        list.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-e01').target('#example-e01').init();</script>

Hasta ahora, todo perfecto. Pero supongamos que tenemos que vincular estos elementos con otro arreglo, que tiene un elemento menos. El mismo código debería funcionar, eliminando el elemento del DOM.

<div class="runnable" id="code-e02">
    <textarea class="form-control">
        // Arreglo de datos de tres elementos
        var data = [
            {texto: 'Talca',   color: 'red'},
            {texto: 'Londres', color: 'green'}
        ];

        var list = d3.select('#example-e01 ul').selectAll('li').data(data);

        // Enter
        list.enter().append('li')
            .html(function(d) { return d.texto; });

        // Update
        list
            .style('color', function(d) { return d.color; });

        // Exit
        list.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-e02').target('#example-e01').init();</script>

Se eliminó el último elemento del DOM, independientemente del contenido. Lo esperado habría sido que el elemento que decía `París` hubiera desaparecido. Esto pasa porque no hemos dicho como hacer la correspondencia entre elementos del DOM y elementos de datos. Queremos que al actualizar los datos, los elementos con el mismo `texto` sean actualizados, y los elementos cuyo `texto` no aparece, sean creados. Para lograr esto, hay que especificar qué atributo de los datos es el ID o key.

<div class="ejemplo">
    <div id="example-e02">
        <ul></ul>
    </div>
</div>

<div class="runnable" id="code-e03">
    <textarea class="form-control">
        // Arreglo de datos de tres elementos
        var data = [
            {texto: 'Talca',   color: 'red'},
            {texto: 'París',   color: 'blue'},
            {texto: 'Londres', color: 'green'}
        ];

        var list = d3.select('#example-e02 ul').selectAll('li')
            .data(data, function(d) { return d.texto; });

        // Enter
        list.enter().append('li')
            .html(function(d) { return d.texto; });

        // Update
        list
            .style('color', function(d) { return d.color; });

        // Exit
        list.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-e03').target('#example-e02').init();</script>

Ahora, si eliminamos un dato, se elimina el elemento del DOM correspondiente.

<div class="runnable" id="code-e04">
    <textarea class="form-control">
        // Arreglo de datos de tres elementos
        var data = [
            {texto: 'Talca',   color: 'red'},
            {texto: 'Londres', color: 'green'}
        ];

        var list = d3.select('#example-e02 ul').selectAll('li')
            .data(data, function(d) { return d.texto; });

        // Enter
        list.enter().append('li')
            .html(function(d) { return d.texto; });

        // Update
        list
            .style('color', function(d) { return d.color; });

        // Exit
        list.exit().remove();
    </textarea>
</div>
<script>runnable().source('#code-e04').target('#example-e02').init();</script>


## Gráfico de barras

Ahora que sabemos sobre D3 y data binding, podemos usar elementos del DOM para crear gráficos. Por ejemplo, podemos crear un gráfico de barras usando contenedores. Supongamos que tenemos los siguientes datos:

<div class="runnable" id="code-f00">
    <textarea class="form-control">
        var data = [
            {name: 'A', a: 150, b:  20},
            {name: 'B', a: 180, b: 140},
            {name: 'C', a: 120, b:  60},
            {name: 'D', a:  90, b:  70},
            {name: 'E', a: 100, b:  80}
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
            .data(data, function(d) { return d.name; });

        // Enter
        divs.enter().append('div').style('height', '30px')
            .style('margin-bottom', '2px')
            .style('background-color', '#ccc')
            .html(function(d) { return d.name; });

        // Update
        divs.style('width', function(d) { return (2 * d.a) + 'px'; });

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
            .style('width', function(d) { return (2 * d.b) + 'px'; });
    </textarea>
</div>
<script>runnable().source('#code-f02').target('#example-f01').init();</script>
