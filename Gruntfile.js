module.exports = function(grunt) {

    // Configure the Grunt tasks
    grunt.initConfig({

        // Compile the styles
        less: {
            development: {
                options: {
                    paths: ['assets/css']
                },
                files: {
                    'assets/css/main.css': 'src/less/main.less'
                }
            }
        },

        // Launch the web server
        connect: {
            server: {
                options: {
                    target: 'http://localhost:5045',
                    port: 5045,
                    livereload: 35729,
                    open: true
                }
            }
        },

        // Watch the filesystem for changes
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less']
            }
        },

    });

    // Load the Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Tasks
    grunt.registerTask('serve', ['connect:server', 'watch']);
};