'use strict';
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './temp/css/main.css': './development/sass/main.scss'
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
                    './public/css/main.min.css': './temp/css/main.css'
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

                    'development/bower_components/jquery/dist/jquery.js',
                    'development/bower_components/jquery-ui/jquery-ui.js',
                    'development/bower_components/angular/angular.js',
                    'development/bower_components/showdown/dist/showdown.js',
                    'development/bower_components/angular-animate/angular-animate.js',
                    'development/bower_components/angular-sanitize/angular-sanitize.js',
                    'development/bower_components/ngEmbed/src/ng-embed.js',
                    'development/bower_components/angular-lazytube/angular-lazytube.js',
                    'development/bower_components/angular-cookies/angular-cookies.js',
                    'development/bower_components/angular-route/angular-route.js',
                    'development/bower_components/handlebars/handlebars.js'
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
                    cwd: 'development/js/',
                    src: '**/*.js',
                    dest: 'public/js/'
                }, {
                    'public/components/modules.min.js': 'development/components/**/*.js', 'public/js/scripts.js': 'temp/js/scripts.js',
                    'public/app.js': 'development/app.js'
                }],

            }
        },
        clean: {
            build: ['public/**/**', 'temp/**/**'],
            temp: ['temp/**/**']
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass', 'cssmin', 'clean:temp']
            },
            scripts: {
                files: ['development/**/*.js'],
                tasks: ['uglify']
            },
            html: {
                files: ['development/**/*.html', 'development/*.ejs'],
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
                        cwd: 'development/components/',
                        src: '**/*.html',
                        dest: 'public/components/'
                },
                    {
                        expand: true,
                        cwd: 'development/',
                        src: '**/*.ejs',
                        dest: 'public/'
                }]
            }
        },
        copy: {
            build: {
                files: [{
                    'public/favicon.ico': 'development/favicon.ico',
                    'public/joshderocherresume.pdf': 'development/joshderocherresume.pdf'
                }]
            }
        },
        imagemin: {
            build: {
                files: [{
                        expand: true,
                        cwd: 'development/',
                        src: ['*.{png,jpg,gif}', 'img/*.{png,jpg,gif}'],
                        dest: 'public/'
           }
           ]
            }
        }
    });
    grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'uglify', 'watch']);
    grunt.registerTask('js', ['concat', 'uglify', 'clean:temp']);
    grunt.registerTask('build', ['clean:build', 'sass', 'cssmin', 'concat', 'uglify', 'htmlmin:build', 'imagemin:build', 'copy', 'clean:temp']);
};
