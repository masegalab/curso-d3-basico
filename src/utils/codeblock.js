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

var codeBlock = function() {
    'use strict';

    var me = {
        editor: null,       // Editor div ID
        aceEditor: null     // Editor instance
    };

    function editorInit(selection) {

        var editorId = d3.select(me.editor).attr('id');

        me.aceEditor = ace.edit(editorId);
        // me.aceEditor.setTheme("ace/theme/github");
        me.aceEditor.getSession().setMode("ace/mode/javascript");
        me.aceEditor.setShowPrintMargin(false);
        me.aceEditor.setHighlightActiveLine(false);

        function updateHeight() {
            var newHeight = me.aceEditor.getSession().getScreenLength()
                  * me.aceEditor.renderer.lineHeight
                  + me.aceEditor.renderer.scrollBar.getWidth();

            d3.select(me.editor).style('height', newHeight + "px");
            me.aceEditor.resize();
        }

        me.aceEditor.getSession().on('change', updateHeight);
        updateHeight();
    }

    function buttonInit(selection) {

        var codeButton = selection.selectAll('button').data([0]);

        // Creates the 'Run' button
        var button = codeButton.enter().append('button')
            .attr('type', 'button')
            .attr('class', 'btn btn-default btn-xs');

        // Add the button and the message
        button.append('span').html('run ');
        button.append('span').attr('class', 'glyphicon glyphicon-play');

        // Binds the click event with the code execution
        codeButton.on('click', chart.run);
    }

    function chart() { }

    chart.init = function() {

        d3.select(me.editor).call(editorInit);
        d3.select(me.editor).call(buttonInit);

        return chart;
    }

    chart.run = function() {
        globalEval(me.aceEditor.getValue());
        return chart;
    }

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