---
layout: seccion
title: Data Binding
---

El DOM se puede manipular con varias librerías, por ejemplo, con jQuery. La diferencia con D3, es que los elementos del DOM se pueden asociar a elementos de un array de datos.</p>

<div class="ejemplo">
  <svg id="ejemplo03" width=400 height=120></svg>
</div>

<div class="runnable" id="code01-06">
  <textarea class="form-control" rows="16">
    var svg = d3.select('#ejemplo03');

    var data = [
        {ancho: 100, color: 'blue'},
        {ancho:  80, color: 'red'},
        {ancho:  60, color: 'yellow'},
        {ancho: 140, color: 'green'}
    ];

    var rect = svg.selectAll('rect').data(data);

    rect.enter().append('rect')
        .attr('y', function(d, i) { return 30 * i; })
        .attr('width', function(d) { return d.ancho; })
        .attr('height', 20)
        .attr('fill', function(d) { return d.color; });
  </textarea>
</div>

<script>
  runnable().source('#code01-06').target('#ejemplo03').init();
</script>

Se pueden actualizar los atributos de los rectángulos.

<div class="ejemplo">
  <svg height="120px">
    <use xlink:href="#ejemplo03" />
  </svg>
</div>

<script type="text/javascript">
  var clone = d3.select('#ejemplo03');
</script>

<div class="runnable" id="code01-07">
  <textarea class="form-control" rows="3">
    d3.selectAll('rect').attr('x', 100);
  </textarea>
</div>

<script>
  runnable().source('#code01-07').target('#ejemplo03').init();
</script>

Si hacemos binding de la misma selección con otro arreglo de datos, los elementos del DOM que tienen datos asociados se actualizan, y los que no, se eliminan. Si hay elementos de dato que no tienen elemento del DOM asociado, se agregan.

<!-- Hay que refinar este ejemplo -->

<div class="ejemplo">
  <svg height="120px">
    <use xlink:href="#ejemplo03" />
  </svg>
</div>

<div class="runnable" id="code01-08">
  <textarea class="form-control" rows="28">
    var svg = d3.select('#ejemplo03');

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
  </textarea>
</div>

<script>
  runnable().source('#code01-08').target('#ejemplo03').init();
</script>

El binding entre elementos graficos y propiedades de los graficos permite crear gráficos y visualizaciones de datos.


<div class="section-nav">
  <div class="prev-section">
    <a href="{{site.baseurl}}/pages/manipulacion-dom"><span class="glyphicon glyphicon-chevron-left"></span> Manipulación del DOM</a>
  </div>

  <div class="next-section">

  </div>
</div>