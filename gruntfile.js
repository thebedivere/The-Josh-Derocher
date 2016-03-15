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
                    './src/css/main.css': './src/sass/main.scss'
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
                './public/css/main.min.css': './src/css/main.css'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [

                    'public/components/jquery/dist/jquery.js',
                    'public/components/angular/angular.js',
                    'public/components/showdown/dist/showdown.min.js',
                    'public/components/angular-animate/angular-animate.js',
                    'public/components/angular-route/angular-route.js',
                    'public/components/handlebars/handlebars.js'
                    /*
                    'public/*.js', 'public/home/*.js', 'public/blog/*.js', 'public/edit/*.js', 'src/js/*.js',
                        */
                
                ],
                dest: 'src/js/scripts.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/js/work.min.js': 'src/js/work.js', 
                    'public/js/resume.min.js': 'src/js/resume.js', 
                    'public/js/scripts.min.js': 'src/js/scripts.js', 
                    'public/js/animation.min.js': 'src/js/animation.js',
                    'public/modules/modules.min.js': 'public/modules/**.js'
                }
            }
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            scripts: {
                files: ['public/**/*.js', '!public/**/**.min.js'],
                tasks: ['concat', 'uglify']
            },
        }
    });
    grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'uglify', 'watch']);
    grunt.registerTask('js', ['concat', 'uglify']);
};
