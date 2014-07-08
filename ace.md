---
layout: curso
title: ACE Demo
---

<script src="assets/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script src="assets/js/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="assets/js/ace-themes/theme-github.js" type="text/javascript" charset="utf-8"></script>

<div>
    <style>
    #editor-div {
        position: absolute;
        width: 500px;
        height: 400px;
    }

    .editor-container {
        position: relative;
    }

    .runnable {
        position: relative;
    }

    </style>
</div>

<div class="container">

    <div class="runnable">
        <div class="editor-container">
            <div id='editor-div'>var a = 1;</div>
        </div>
    </div>

    <script>
        var editor = ace.edit("editor-div");
        editor.setTheme("ace/theme/monokai");
        // editor.setOptions({maxLines: Infinity});
        editor.getSession().setMode("ace/mode/javascript");

        function updateHeight() {
            var newHeight =
                  editor.getSession().getScreenLength()
                  * editor.renderer.lineHeight
                  + editor.renderer.scrollBar.getWidth();


            $('#editor-div').height(newHeight.toString() + "px");
            editor.resize();
        }

        editor.getSession().on('change', updateHeight);
        updateHeight();

    </script>
</div>

## Editor

<script src="src/utils/codeblock.js"></script>

<div class="runnable" id="editor-a01">
var a = 1;
function b() {}
</div>
<script>codeBlock().editor('#editor-a01').init().run();</script>


