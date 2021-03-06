module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    basePath: 'test/client',
    browsers: ['Chrome'],
    preprocessors: {
      '[your_app_here]/*.coffee': ['coffee']
    },
    coffeePreprocessor: {
      options: {
        bare: true,
        sourceMap: false
      },
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js')
      }
    },
    files: [
      '../../public/javascripts/application.js',
      '../../bower_components/angular-mocks/angular-mocks.js',
      '[your_app_here]/*.coffee'
    ]
  });
};
