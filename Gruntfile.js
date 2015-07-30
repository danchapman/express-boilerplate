module.exports = function(grunt) {

  function getStylusOptions(compress) {
      return { options: {
        compress: compress,
        use: [require('rupture')],
        paths: [
          './node_modules/rupture',
          './stylus'
        ],
        import: [
          'nib/*',
          'extensions/*'
        ]
      },
      files: {
        'public/stylesheets/style.css': [
          'assets/stylus/base.styl',
          'assets/stylus/type_rhythm.styl',
          'assets/stylus/objects/*.styl'
        ]
      }
    }
  }

  var stylusDevOptions = getStylusOptions(false)
  var stylusProdOptions = getStylusOptions(true)

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower_concat: {
      all: {
        dest: 'build/_bower.js',
        cssDest: 'build/_bower.css',
        include: [
          'angular',
          'angular-resource'
        ]
      }
    },

    coffee: {
      compile: {
        options: {
          join: true
        },
        files: {
          'public/javascripts/application.js': ['assets/coffee/**/*.coffee']
        }
      }
    },

    concat: {
      js: {
        src: ['build/_bower.js', 'public/javascripts/application.js'],
        dest: 'public/javascripts/application.js',
      },
      css: {
        src: ['build/_bower.css',
              'assets/stylus/icomoon.css',
              'public/stylesheets/style.css'
             ],
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
      compile: stylusProdOptions,
      compileDev: stylusDevOptions
    },

    watch: {
      options: {
        livereload: true
      },
      coffee: {
        files: ['assets/coffee/**/*.coffee'],
        tasks: ['coffee','concat:js']
      },
      stylus: {
        files: ['assets/stylus/**/*.styl', 'assets/stylus/**/*.css'],
        tasks: ['stylus:compileDev','concat:css']
      },
      views: {
        files: ['views/*.jade']
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/**/*.js']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.registerTask('devAssets',
                     ['coffee',
                      'stylus:compileDev',
                      'bower_concat',
                      'concat:js',
                      'concat:css'
                     ]);

  grunt.registerTask('prodAssets',
                     ['coffee',
                      'stylus:compile',
                      'bower_concat',
                      'concat:js',
                      'concat:css',
                      'uglify'
                     ]);

  grunt.registerTask('tests',
                     ['mochaTest',
                      'karma'
                     ]);

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
};
