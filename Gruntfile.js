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
    stylus: {
      compile: {
        options: {
          compress: true,
        },
        files: {
          'public/stylesheets/style.css': 'assets/stylus/*.styl'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');
};
