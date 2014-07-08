---
layout: seccion
title: Data Binding
parent:
    url: pages/introduccion-d3.html
    title: Introducción a D3
prev:
    url: pages/manipulacion-dom.html
    title: Manipulación del DOM
next:
    url: pages/grafico-barras.html
    title: Gráfico de Barras
---

Muchas herramientas nos permiten manipular el DOM (jQuery, y la API nativa del DOM, entre otras). La principal característica de D3 es que nos permite vincular elementos del DOM con elementos de datos. Por ejemplo, tenemos tres items en una lista:

<div class="ejemplo">
    <div id="example-b01">
        <ul>
            <li>uno</li>
            <li>dos</li>
            <li>tres</li>
        </ul>
    </div>
</div>

<aside>Para una explicación pedagógica de data binding, puede consultar la <a href="http://chimera.labs.oreilly.com/books/1230000000345/ch05.html#_binding_data">versión online</a> del libro de Scott Murray <a href="http://shop.oreilly.com/product/0636920026938.do">"Interactive Data Visualization for the Web"</a>.</aside>

Estos elementos no tienen datos vinculados. Podemos vincular cada uno de estos elementos con un elemento de un arreglo de datos usando `data()`:

<div class="runnable" id="code-b01">
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
</div>

<script>codeBlock().editor('#code-b01').init();</script>

Si inspeccionamos estos elementos, veremos que tienen una nueva propiedad: el attributo `__data__`. Pero, visualmente, no pasó nada.

Ahora, podemos usar los datos para modificar los atributos del elemento del DOM. Por ejemplo, podemos cambiar el color de los ítems de la lista usando el atributo `color` del dato asociado a cada uno de ellos.

<div class="runnable" id="code-b02">
// Cambia el color de cada item
list.style('color', function(d) { return d.color; });
</div>

<script>codeBlock().editor('#code-b02').init();</script>

Dependiendo del tipo de elemento del DOM, se puede usar `attr` para modificar los atributos, `style` para propiedades de estilo, `text` o `html` para contenido. Por ejemplo, ahora podemos alterar el contenido del elemento de lista.

<div class="runnable" id="code-b03">
// Cambia el texto de cada item
list.html(function(d) { return d.texto; });
</div>

<script>codeBlock().editor('#code-b03').init();</script>

### La Seleccion `enter()`

<aside>El tutorial <a href="http://bost.ocks.org/mike/circles/">"Circles"</a> de Mike Bostock ilustra los conceptos expuestos en esta sección.</aside>

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
// Vinculamos los elementos de la lista con los elementos del arreglo
var list = d3.select('#example-c01 ul').selectAll('li').data(data);
</div>
<script>codeBlock().editor('#code-c01').init();</script>

La selección `list.enter()` contiene una referencia a los elementos de lista no creados. Podemos usar esta selección para crear los elementos.

<div class="runnable" id="code-c02">
// Crea un elemento de lista para el elemento de dato sin DOM
list.enter().append('li')
    .html(function(d) { return d.texto; });
</div>

<script>codeBlock().editor('#code-c02').init();</script>

El nuevo elemento fue creado, y además configuramos su contenido para que use los datos. Notar que el resto de los elementos no ha sido actualizado. Una vez creado el elemento, está disponible en la variable `list`, y puede ser actualizado con el resto de los elementos.

<div class="runnable" id="code-c03">
// Crea un elemento de lista para el elemento de dato sin DOM
list
    .style('color', function(d) { return d.color; })
    .html(function(d) { return d.texto; });
</div>
<script>codeBlock().editor('#code-c03').init();</script>

### La Selección `exit()`.

<aside>El tutorial <a href="http://bost.ocks.org/mike/circles/">"Circles"</a> de Mike Bostock ilustra los conceptos expuestos en esta sección.</aside>

También puede ocurrir el caso contrario, que hay más elementos del DOM que elementos de datos. Los elementos restantes quedan almacenados en una selección especial llamada exit, que usaremos para remover los elementos.

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
// Vinculamos los elementos de la lista con los elementos del arreglo
var list = d3.select('#example-d01 ul').selectAll('li').data(data);
</div>
<script>codeBlock().editor('#code-d01').init();</script>

Podemos usar esta selección para remover el elemento que no tiene datos. Notar que la selección funciona casi igual que el resto, podemos alterar los atributos de los elementos del DOM (pero sin usar datos, porque no tienen).

<div class="runnable" id="code-d02">
list.exit().style('color', 'yellow');
</div>
<script>codeBlock().editor('#code-d02').init();</script>

También podemos simplemente eliminarlos.

<div class="runnable" id="code-d03">
list.exit().remove();
</div>
<script>codeBlock().editor('#code-d03').init();</script>

Normalmente, el código D3 debe manejar estas tres situaciones, `enter`, update y `exit`. Ejecutando correctamente esta secuencia asegura que los datos y el DOM estén sincronizados.

<div class="ejemplo">
    <div id="example-d04">
        <ul></ul>
    </div>
</div>

<div class="runnable" id="code-d04">
// Arreglo de datos de tres elementos
var data = [
    {texto: 'Talca',   color: 'red'},
    {texto: 'París',   color: 'blue'},
    {texto: 'Londres', color: 'green'}
];

var list = d3.select('#example-d04 ul').selectAll('li').data(data);

// Enter
list.enter().append('li')
    .html(function(d) { return d.texto; });

// Update
list
    .style('color', function(d) { return d.color; });

// Exit
list.exit().remove();
</div>
<script>codeBlock().editor('#code-d04').init();</script>


### Usando un ID

Hasta ahora, hemos usado la posición de los elementos del DOM y la posición de los elementos en el arreglo para determinar la correspondencia entre ellos. Esto puede generar problemas, por ejemplo, vamos a crear una lista nueva usando datos.

<div class="ejemplo">
    <div id="example-e01">
        <ul></ul>
    </div>
</div>

<div class="runnable" id="code-e01">
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
</div>
<script>codeBlock().editor('#code-e01').init();</script>

Ahora, supongamos que queremos vincular estos elementos con otro arreglo, que tiene un elemento menos. El mismo código debería funcionar, eliminando el elemento del DOM.

<div class="runnable" id="code-e02">
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
</div>
<script>codeBlock().editor('#code-e02').init();</script>

Se eliminó el último elemento del DOM, independientemente del contenido. Sin embargo, era razonable esperar que el elemento con texto `París` hubiera desaparecido. Esto ocurre porque no hemos especificado la correspondencia entre elementos del DOM y elementos de datos. Queremos que al actualizar los datos, los elementos cuyo `texto` aparece en algún elemento de dato sean actualizados, y los demás sean eliminados. Para lograr esto, necesitamos especificar qué atributo de los datos es el ID o key.

<div class="ejemplo">
    <div id="example-e02">
        <ul></ul>
    </div>
</div>

<div class="runnable" id="code-e03">
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
</div>
<script>codeBlock().editor('#code-e03').init();</script>

Ahora, si eliminamos un dato, se elimina el elemento del DOM correspondiente.

<div class="runnable" id="code-e04">
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
</div>
<script>codeBlock().editor('#code-e04').init();</script>
