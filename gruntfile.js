'use strict';
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './testApp/public/css/main.css': './sass/main.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                },
            },
        }
    });
    grunt.registerTask('default', ['sass', 'watch']);
};