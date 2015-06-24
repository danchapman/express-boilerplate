module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        options: {
          join: true
        },
        files: {
          'public/javascripts/main.js': 'assets/coffee/*.coffee' // compile and concat into single file
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
};
