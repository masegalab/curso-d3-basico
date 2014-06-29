---
layout: seccion
title: Manipulación del DOM con D3
---

Podemos usar D3 para manipular elementos del DOM (_Document Object Model_). Por ejemplo, podemos cambiar el color de fondo de un contenedor.

<div class="ejemplo">
  <div class="fila" id="ejemplo01">
    <div id="block01-01" class="example-block"></div>
    <div id="block01-02" class="example-block"></div>
  </div>
</div>

<div class="runnable" id="code01-01">
  <textarea class="form-control" rows="1">
    d3.select('#block01-01').style('background-color', '#C56060');
  </textarea>
</div>

<script>
  runnable().source('#code01-01').target('#ejemplo01').init();
</script>

Podemos cambiar varios elementos al mismo tiempo, seleccionando por clase o por tipo de elemento.

<div class="runnable" id="code01-02">
  <textarea class="form-control" rows="1">
    d3.selectAll('.example-block').style('width', '150px');
  </textarea>
</div>

<script>
  runnable().source('#code01-02').target('#ejemplo01').init();
</script>

<!-- Poner la lista a la derecha del DIY-->

<div class="diy">
  <h3><span class="glyphicon glyphicon-pencil"></span> Prueba tú mismo</h3>
  <ul>
    <li> Cambiar la altura del contenedor verde (<code>#block-01-02</code>).</li>
    <li> Alinear los contenedores a la derecha.</li>
    <li> Escribir algo dentro de un contenedor.</li>
  </ul>

  <div class="runnable" id="diy-01-01">
    <textarea class="form-control" rows="1">
      // Codigo aqui
    </textarea>
  </div>
</div>

<script>
  runnable().source('#diy-01-01').target('#ejemplo01').init();
</script>


Podemos agregar elementos usando `append` o `insert`.


<div class="ejemplo">
  <div class="fila" id="ejemplo02">
    <div id="block02-01" class="example-block"></div>
    <div id="block02-02" class="example-block"></div>
  </div>
</div>

<div class="runnable" id="code01-03">
  <textarea class="form-control" rows="4">
    var svg01 = d3.select('#ejemplo02').append('svg')
    .attr('id','new-svg')
    .attr('width', 200)
    .attr('height', 150)
    .style('border', 'solid 1px #ccc');
  </textarea>
</div>

<script>
  runnable().source('#code01-03').target('#ejemplo02').init();
</script>

La variable `svg` contiene una referencia al elemento creado. Podemos usar esta referencia para cambiar los atributos del elemento.

<div class="runnable" id="code01-04">
  <textarea class="form-control" rows="3">
    svg01.attr('width', 300).attr('height', 100).style('border', 'solid 1px black');
  </textarea>
</div>

<script>
  runnable().source('#code01-04').target('#ejemplo02').init();
</script>

<p>Podemos agregar un rectángulo al SVG.</p>

<div class="runnable" id="code01-05">
  <textarea class="form-control" rows="6">
    var rect = svg01.append('rect')
      .attr('fill', 'blue')
      .attr('x', 20)
      .attr('y', 20)
      .attr('width', 150)
      .attr('height', 60);
  </textarea>
</div>

<script>
  runnable().source('#code01-05').target('#ejemplo02').init();
</script>

<div class="diy">
  <h3><span class="glyphicon glyphicon-pencil"></span> Prueba tú mismo</h3>
  <ul>
    <li>Agregar un circulo <code>&lt;circle cx=10 cy=10 r=30 fill='red'&gt;&lt;/circle&gt;</code></li>
    <li>También se pueden eliminar elementos del DOM. Por ejemplo, se puede borrar el rectángulo con <code>rect.remove()</code>.</li>
  </ul>

  <div class="runnable" id="diy-01-02">
    <textarea class="form-control">
      // Codigo aqui
    </textarea>
  </div>

  <script>
    runnable().source('#diy-01-02').target('#ejemplo02').init();
  </script>
</div>


<div class="section-nav">
  <div class="prev-section">

  </div>

  <div class="next-section">
    <a href="{{site.baseurl}}/pages/data-binding">Data Binding <span class="glyphicon glyphicon-chevron-right"></span></a>
  </div>
</div>
