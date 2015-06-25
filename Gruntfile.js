module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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

  grunt.registerTask('devAssets', ['coffee', 'stylus:compileDev']);
  grunt.registerTask('prodAssets', ['coffee', 'uglify', 'stylus:compile']);

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
