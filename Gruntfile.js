module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower_concat: {
      dev: {
        dest: 'build/_bower.js',
        cssDest: 'build/_bower.css',
        include: [
          'angular'
        ]
      },
      prod: {
        dest: 'build/_bower.js',
        cssDest: 'build/_bower.css',
        include: [
          'angular'
        ]
      }
    },
    coffee: {
      compile: {
        options: {
          join: true
        },
        files: {
          'public/javascripts/application.js': 'assets/coffee/*.coffee'
        }
      }
    },
    concat: {
      js: {
        src: ['build/_bower.js', 'public/javascripts/application.js'],
        dest: 'public/javascripts/application.js',
      },
      css: {
        src: ['build/_bower.css', 'public/stylesheets/style.css'],
        dest: 'public/stylesheets/style.css',
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/javascripts/application.js': 'public/javascripts/application.js'
        }
      }
    },
    stylus: {
      compile: {
        options: {
          compress: true,
        },
        files: {
          'public/stylesheets/style.css': 'assets/stylus/*.styl'
        }
      },
      compileDev: {
        options: {
          compress: false,
        },
        files: {
          'public/stylesheets/style.css': 'assets/stylus/*.styl'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      coffee: {
        files: ['assets/coffee/*.coffee'],
        tasks: ['coffee']
      },
      stylus: {
        files: ['assets/coffee/*.coffee'],
        tasks: ['stylus:compileDev']
      },
      views: {
        files: ['views/*.jade']
      }
    }
  });

  grunt.registerTask('devAssets', ['coffee', 'stylus:compileDev', 'bower_concat:dev', 'concat:js', 'concat:css']);
  grunt.registerTask('prodAssets', ['coffee', 'stylus:compile', 'bower_concat:prod', 'concat:js', 'concat:css', 'uglify']);

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-concat');
};
