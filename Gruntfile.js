'use strict';

module.exports = function(grunt) {
  // Requires here.
	require("time-grunt")(grunt);
	require("jit-grunt")(grunt, {
		useminPrepare: "grunt-usemin"
	});
	
  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON("package.json"),
    jshint: {
      all: [
        'Gruntfile.js',
        'main.js'
      ],
      options: {
        jshintrc:".jshintrc",
		reporter: require("jshint-stylish")
		
      }
    },
	copy: {
      dist: {
        cwd: 'app',
        src: [ '**','!*.css','!*.js' ],
        dest: 'dist',
        expand: true
      },
      fonts: {
          files:[
              {
                  //for bootstrap fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }, {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }
          ]
        }
    },
    clean: {
        build:{
            src: [ 'dist/']
        }
    },
    useminPrepare: {
        html: 'app/test.html',
        options: {
            dest: 'dist'
        }
    },
	ngAnnotate: {
		options: {
        remove: true,
        add: true,
        singleQuotes: true
		},
        app: {
            files: {
                'app/main.annotate.js': ['app/main.js']
            },
        }
    },
    concat: {
        options: {
            separator: ';'
        },
        dist: {}
    },
    uglify: {
        dist: {}
    },
    cssmin: {
        dist: {}
    },
    filerev: {
        options: {
            encoding: 'utf8',
            algorithm: 'md5',
            length: 20
        },
        release: {
            files: [{
                src: [
                    'dist/*.js',
                    'dist/*.css',
                ]
            }]
        }
    },watch: {
        copy: {
            files: [ 'app/**', '!app/*.js'],
            tasks: [ 'build' ]
        },
        scripts: {
            files: ['app/main.js'],
            tasks:[ 'build']
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                'app/*.html',
				'.tmp/{,*/}*.css',
                'app/images/*.jpg'
            ]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      dist: {
        options: {
          open: true,
          base:{
               path: 'dist',
            options: {
                index: 'test.html',
                maxAge: 300000
            }
          }
        }
      }
	},
    usemin: {
        html: ['dist/*.html'],
        css: ['dist/*.css'],
        options: {
            assetsDirs: ['dist']
        }
    }
  
	});

  
  // "npm test" runs these tasks
    grunt.registerTask('build', ['clean', 
    'jshint',
    'useminPrepare',
	'ngAnnotate',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'filerev',
    'usemin']);
	grunt.registerTask('serve',['build','connect:dist','watch']);
	
  // Default task.
   grunt.registerTask('default', ['build']);
   

};
