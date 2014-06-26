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
        codeButton.enter().insert('button', ':first-child')
            .attr('type', 'button')
            .attr('class', 'btn btn-default btn-sm')
            .append('span')
            .attr('class', 'glyphicon glyphicon-play')
            .html('Ejecutar');

        // Binds the click event with the code execution
        codeButton.on('click', chart.run);

        // Remove trailing white spaces in the input code
        textCode.node().value = textCode.node().value.trim();
    };

    chart.run = function() {
        var codeDiv    = d3.select(me.source),
            textCode   = codeDiv.select('textarea');

        // Run the content of the textarea element
        eval(textCode.node().value);
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