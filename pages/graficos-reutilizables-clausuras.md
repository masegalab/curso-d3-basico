---
layout: seccion
title: Clausuras
parent:
    url: pages/graficos-reutilizables.html
    title: Gráficos Reusables
prev:
    url: pages/graficos-reutilizables-recapitulando.html
    title: Recapitulando
next:
    url: pages/graficos-reutilizables-scatter-chart.html
    title: Scatter Chart
---

El gráfico de la sección anterior funciona, pero requiere que el usuario defina todas las variables de configuración del gráfico en el contexto global. Lo ideal sería que esas variables sean internas al gráfico, pero que se puedan configurar adecuadamente.

### Scope en JavaScript

En JavaScript, el comportamiento por defecto es que las variables se crean en el contexto global. Por ejemplo, si definimos la variable `width`, su valor será visible para cualquier función que se invoque en la página.

<div class="runnable" id="code-a01">
// Declaramos la variable `width` globalmente
var width = 100;
console.log('[global] width = ' + width);
</div>
<script>codeBlock().editor('#code-a01').init();</script>

Si definimos la función `changeWidth` en el contexto global, tendrá acceso a todas las variables definidas en este contexto, y por tanto, la función `changeWidth` puede modificar la variable `width` globalmente.

<div class="runnable" id="code-a02">
function changeWidth() {
    width = 150;
    console.log('[changeWidth] width = ' + width);
}
changeWidth();
</div>
<script>codeBlock().editor('#code-a02').init();</script>

El que la variable `width` se cambie en el contexto global puede causar problemas con código en otras partes de la página.

<div class="runnable" id="code-a03">
console.log('[global] width = ' + width);
</div>
<script>codeBlock().editor('#code-a03').init();</script>

Esto es una fuente potencial de errores de programación y de conflictos de nombre, sobre todo con nombres de variable comunes.

### Clausuras

Lo ideal sería crear estas variables en un contexto privado, no visible desde el scope global. Las funciones declaradas dentro de una función son visibles en todas partes dentro de esta función, pero no fuera de ella. En JavaScript, las funciones tienen una referencia al _scope_ en el que fueron creadas. Por ejemplo, el scope de la función `chart` es la función `createChart`, por tanto `chart` tiene acceso a todas las variables definidas en `createChart`.

<div class="runnable" id="code-a04">
function createChart() {
    // Attributos
    var width = 50;

    console.log('[createChart] width = ' + width);

    function chart() {
        console.log('[chart] width = ' + width);
    }

    chart();
}

createChart();

console.log('[global] width = ' + width);
</div>
<script>codeBlock().editor('#code-a04').init();</script>

Logramos crear la variable `width` interna a la función, que no interfiere con el valor de la variable global `width`. Esto nos permitirá crear una función para crear un gráfico usando variables internas, minimizando el riesgo de conflictos con variables definidas en el contexto global.

Ahora, no tenemos acceso a la variable interna `width` fuera de la función `createChart`, por tanto la única forma de cambiar su valor es cambiando el código de la función `createChart`. La idea, es poder usar el gráfico sin tener que modificar el código. Afortunadamente, JavaScript tiene algunas particularidades que nos ayudan con esta situación.

### Funciones

En JavaScript, las funciones son objetos de _primera clase_. Esto significa que son variables como cualquier otra, se pueden pasar como argumento a otras funciones, asignar a variables y se les pueden agregar atributos. También podemos retornar funciones, haremos esto con la función `chart`.

<div class="runnable" id="code-a05">
function createChart() {

    var width = 50;

    function chart() {
        console.log('[chart] width = ' + width);
    }

    // Retornamos la función
    return chart;
}

// La función `createChart` retorna la función `chart`
var grafico = createChart();

// La variable global `width` no se altera
console.log('[global] width = ' + width);
</div>
<script>codeBlock().editor('#code-a05').init();</script>

La función `grafico` es una referencia a la función `chart`. Podemos ahora invocar a la función `grafico`, lo que tendrá el mismo efecto que invocar la función `chart` dentro de `createChart`.

<div class="runnable" id="code-a06">
// Invocamos a la función `chart`
grafico();

// La variable global `width` no se altera
console.log('[global] width = ' + width);
</div>
<script>codeBlock().editor('#code-a06').init();</script>

Como las funciones son objetos como cualquier otro, podemos agregar atributos a una función. Por ejemplo, vamos a agregar una etiqueta a la función `chart`.

<div class="runnable" id="code-a07">
function createChart() {

    var width = 50;

    function chart() {
        console.log('[chart] width = ' + width);
    }

    // Agregamos un atributo a la función
    chart.label = 'awesome!';

    return chart;
}

var grafico = createChart();

// Tenemos acceso al atributo `label`
console.log('etiqueta = ' + grafico.label);

// La variable global `width` no se altera
console.log('[global] width = ' + width);
</div>
<script>codeBlock().editor('#code-a07').init();</script>

Pero además de agregar atributos simples a una función, estos atributos pueden ser funciones. Estas funciones también tienen acceso al scope de la función `chart`, y por tanto, a todas las variables definidas en `createChart`.

<div class="runnable" id="code-a08">
function createChart() {

    var width = 50;

    function chart() {
        console.log('[chart] width = ' + width);
    }

    chart.setWidth = function(newWidth) {
        width = newWidth;
    };

    return chart;
}
</div>
<script>codeBlock().editor('#code-a08').init();</script>

Ahora podemos cambiar el valor de la variable `width` interna a la función `createChart` sin modificar el código de la función.

<div class="runnable" id="code-a08-1">
var grafico = createChart();

// Invocamos el método/atributo `setWidth` de la función `grafico`
grafico.setWidth(500);

// Ahora invocamos la función `grafico`.
grafico();

// La variable global `width` no se altera
console.log('[global] width = ' + width);
</div>
<script>codeBlock().editor('#code-a08-1').init();</script>

Ahora, podemos hacer una función que permite obtener y definir un valor al mismo tiempo, para no tener que crear funciones `get` y `set` para cada atributo de la función.

<div class="runnable" id="code-a09">
function createChart() {

    var width = 50;

    function chart() {
        console.log('[chart] width = ' + width);
    }

    chart.width = function(newWidth) {
        if (!arguments.length) { return width; }
        width = newWidth;
    };

    return chart;
}

var chart = createChart();

// Obtenemos el ancho
console.log('chart width = ' + chart.width());

// Definimos un nuevo ancho
chart.width(1000);

// Obtenemos el nuevo ancho
console.log('chart width = ' + chart.width());
</div>
<script>codeBlock().editor('#code-a09').init();</script>

Podemos definir el valor antes o después de invocar a la función `chart`, en ambos casos el efecto es el mismo. Agregando un último detalle, podemos agregar soporte para _method chaining_, permitiendo configurar varios atributos en cadena.

<div class="runnable" id="code-a11">
function createChart() {

    var width  = 50,
        height = 50;

    function chart() {
        console.log('chart size = ' + width + 'x' + height);
    }

    chart.width = function(newWidth) {
        if (!arguments.length) { return width; }
        width = newWidth;
        return chart;
    };

    chart.height = function(newHeight) {
        if (!arguments.length) { return height; }
        height = newHeight;
        return chart;
    };

    return chart;
}
</div>
<script>codeBlock().editor('#code-a11').init();</script>

Podemos definir el alto y ancho en una línea. Este patrón es bastante usado en JavaScript.

<div class="runnable" id="code-a12">
// Creamos la función `chart`
var chart = createChart();

// Obtenemos el ancho y alto
console.log('chart size = ' + chart.width() + 'x' + chart.height());

// Definimos un nuevo ancho
chart.width(1000).height(200);

// Obtenemos los valores ancho y alto actualizados
console.log('chart size = ' + chart.width() + 'x' + chart.height());
</div>
<script>codeBlock().editor('#code-a12').init();</script>

### Creando un gráfico reusable

Esta construcción nos permitirá crear un gráfico reusable, con métodos para configurar la apariencia (ancho, alto, márgenes) y las funciones de acceso a las variables. Usando la estructura que hemos construido, sólo nos faltaría cambiar la función `chart` para que reciba una selección.

<div class="runnable" id="code-b01">
function createListItems() {

    var color = 'blue',
        label = function(d) { return d.label; };

    function chart(selection) {
        selection.each(function(data) {

            var ul = d3.select(this),
                li = ul.selectAll('li').data(data);

            li.enter().append('li')
                .html(function(d) { return label(d); })
                .style('color', color);

            li
                .style('color', color)
                .html(function(d) { return label(d); });
        });
    }

    chart.label = function(labelAccessor) {
        if (!arguments.length) { return label; }
        label = labelAccessor;
        return chart;
    };

    chart.color = function(newColor) {
        if (!arguments.length) { return color; }
        color = newColor;
        return chart;
    };

    return chart;
}
</div>
<script>codeBlock().editor('#code-b01').init();</script>

Podemos usar este gráfico básico para crear elementos de lista usando cualquier arreglo de datos:

<div class="runnable" id="code-b02">
var data = [
    {nombre: 'Jorge',  profesion: 'DT'},
    {nombre: 'Manuel', profesion: 'Ingeniero'},
    {nombre: 'Gary',   profesion: 'Futbolista'},
];

var grafico = createListItems()
    .label(function(d) { return d.nombre; });

d3.select('#ejemplo-b01 ul')
    .data([data])
    .call(grafico);
</div>
<script>codeBlock().editor('#code-b02').init();</script>

<div class="ejemplo">
    <div id="ejemplo-b01">
        <ul></ul>
    </div>
</div>

y además, podemos actualizar los atributos del gráfico y actualizar con datos nuevos.

<div class="runnable" id="code-b03">
var data2 = [
    {nombre: 'Jorge',       profesion: 'DT'},
    {nombre: 'Gary',        profesion: 'Futbolista'},
    {nombre: 'Luiz Felipe', profesion: 'Cesante'},
    {nombre: 'Joachim',     profesion: 'Genio'}
];

var grafico = createListItems()
    .label(function(d) { return d.nombre + ', ' + d.profesion + '.'; })
    .color('red');

d3.select('#ejemplo-b01 ul')
    .data([data2])
    .call(grafico);
</div>
<script>codeBlock().editor('#code-b03').init();</script>

