// Evaluates JavaScript code in the global scope
var globalEval = (function() {

  var isIndirectEvalGlobal = (function(original, Object) {
    try {
      // Does `Object` resolve to a local variable, or to a global, built-in `Object`,
      // reference to which we passed as a first argument?
      return (1,eval)('Object') === original;
    }
    catch(err) {
      // if indirect eval errors out (as allowed per ES3), then just bail out with `false`
      return false;
    }
  })(Object, 123);

  if (isIndirectEvalGlobal) {

    // if indirect eval executes code globally, use it
    return function(expression) {
      return (1,eval)(expression);
    };
  }
  else if (typeof window.execScript !== 'undefined') {

    // if `window.execScript exists`, use it (IE and old Webkit)
    return function(expression) {
      return window.execScript(expression);
    };
  }

  // otherwise, globalEval is `undefined` since nothing is returned
})();

function runnable() {

    var me = {
        source: null,  // ID of the code container
        target: null   // ID of the output container
    };

    function chart() {

    };

    chart.init = function() {

        // Init the code container
        var codeDiv    = d3.select(me.source),
            codeButton = codeDiv.selectAll('button').data([null]),
            textCode   = codeDiv.select('textarea');

        // Creates the 'Run' button
        var button = codeButton.enter().insert('button', ':first-child')
            .attr('type', 'button')
            .attr('class', 'btn btn-default btn-xs');

        // Add the button and the message
        button.append('span').html('run ');
        button.append('span').attr('class', 'glyphicon glyphicon-play');


        // Binds the click event with the code execution
        codeButton.on('click', chart.run);


        var text = textCode.node().value,
            lines = text.split('\n');

        lines = lines.map(function(line) { return line.trim(); });
        textCode.node().value = lines.join('\n');
        textCode.attr('rows', lines.length);
    };

    chart.run = function() {
        var codeDiv    = d3.select(me.source),
            textCode   = codeDiv.select('textarea');

        // Run the content of the textarea element
        globalEval(textCode.node().value);
    };

    // Accessor methods
    function createAccessor(attr) {
        return function(value) {
            if (!arguments.length) { return me[attr]; }
            me[attr] = value;
            return chart;
        }
    }

    for (var attr in me) {
        if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};