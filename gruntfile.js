'use strict';
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        // Project configuration
        dirs: {
            // Build folder
            output: 'public',
            // Source folder
            source: 'development',
            // Bower components folder
            bower: 'development/bower_components'
        },
        // Create bower config file
        pkg: grunt.file.readJSON('package.json'),
        "file-creator": {
            "bower": {
                ".bowerrc": function (fs, fd, done) {
                    fs.writeSync(fd, '{"directory": "development/bower_components/","analytics": false,"timeout": 120000,"registry": { "search": ["https://bower.herokuapp.com" ]}}');
                    done();
                }
            },
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './temp/css/main.css': './<%= dirs.source %>/sass/main.scss'
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './<%= dirs.output %>/css/main.min.css': './temp/css/main.css'
                }
            }
        },
        concat: {
            // Concat all of the JavaScript dependencies
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    '<%= dirs.bower %>/jquery/dist/jquery.js',
                    '<%= dirs.bower %>/jquery-ui/jquery-ui.js',
                    '<%= dirs.bower %>/angular/angular.js',
                    '<%= dirs.bower %>/showdown/dist/showdown.js',
                    '<%= dirs.bower %>/angular-animate/angular-animate.js',
                    '<%= dirs.bower %>/angular-sanitize/angular-sanitize.js',
                    '<%= dirs.bower %>/ngEmbed/src/ng-embed.js',
                    '<%= dirs.bower %>/angular-lazytube/angular-lazytube.js',
                    '<%= dirs.bower %>/angular-cookies/angular-cookies.js',
                    '<%= dirs.bower %>/angular-route/angular-route.js',
                    '<%= dirs.bower %>/handlebars/handlebars.js'
                ],
                dest: 'temp/js/scripts.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.source %>/js/',
                    src: '**/*.js',
                    dest: '<%= dirs.output %>/js/'
                }, {
                    '<%= dirs.output %>/components/modules.min.js': '<%= dirs.source %>/components/**/*.js',
                    '<%= dirs.output %>/js/scripts.js': 'temp/js/scripts.js',
                    '<%= dirs.output %>/app.js': '<%= dirs.source %>/app.js'
                }],

            }
        },
        clean: {
            build: ['<%= dirs.output %>/**/**', 'temp/**/**'],
            temp: ['temp/**/**']
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass', 'cssmin', 'clean:temp']
            },
            scripts: {
                files: ['<%= dirs.source %>/**/*.js'],
                tasks: ['uglify']
            },
            html: {
                files: ['<%= dirs.source %>/**/*.html', '<%= dirs.source %>/*.ejs'],
                tasks: ['htmlmin']
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                        expand: true,
                        cwd: '<%= dirs.source %>/components/',
                        src: '**/*.html',
                        dest: '<%= dirs.output %>/components/'
                },
                    {
                        expand: true,
                        cwd: '<%= dirs.source %>/',
                        src: '**/*.ejs',
                        dest: '<%= dirs.output %>/'
                }]
            }
        },
        copy: {
            build: {
                files: [{
                    '<%= dirs.output %>/favicon.ico': '<%= dirs.source %>/favicon.ico',
                    '<%= dirs.output %>/joshderocherresume.pdf': '<%= dirs.source %>/joshderocherresume.pdf'
                }]
            }
        },
        imagemin: {
            build: {
                files: [{
                        expand: true,
                        cwd: '<%= dirs.source %>/',
                        src: ['*.{png,jpg,gif}', 'img/*.{png,jpg,gif}'],
                        dest: '<%= dirs.output %>/'
           }
           ]
            }
        }
    });
    grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'uglify', 'watch']);
    grunt.registerTask('js', ['concat', 'uglify', 'clean:temp']);
    grunt.registerTask('build', ['clean:build', 'sass', 'cssmin', 'concat', 'uglify', 'htmlmin:build', 'imagemin:build', 'copy', 'clean:temp']);
};
