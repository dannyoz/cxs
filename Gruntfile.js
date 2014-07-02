module.exports = function(grunt) {

    // CONFIG 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        imagemin: {                                // Task
            dynamic: {                             // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'images/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'public/images/'                  // Destination path prefix
                }]
            }
        },

        concat: {
            dist: {
                src: [
                    //'js/libs/*.js', // All JS in the libs folder
                    'js/libs/angular.js',
                    'js/libs/angular-route.js',
                    'js/app.js',
                    'js/directives/*.js',
                    'js/factories/*.js',
                    'js/controllers/*.js'
                ],
                dest: 'public/js/main.js',
            }
        },

        uglify: {
            build: {
                src: 'public/js/main.js',
                dest: 'public/js/main.min.js'
            }
        },

        watch: {
            scripts: {
                files: ['js/*.js',
                        'js/directives/*.js',
                        'js/factories/*.js',
                        'js/controllers/*.js'
                        ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },

            css: {
                files: ['sass/*.scss', 'sass/*/*.scss', 'sass/*/*/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            }
        },

        compass: {                  
            dist: {                
                options: {          
                    sassDir: 'sass',
                    cssDir: 'public/css',
                    environment: 'development'
                }
            }
        },

        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                  script: 'server.js'
                }
            }
        }

    });

    // PACKAGES
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-express-server');

    // RUN GRUNT 
    grunt.registerTask('default', ['concat', 'uglify', 'express:dev', 'watch', 'compass']);

};