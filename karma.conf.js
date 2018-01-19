const webpack = require('karma-webpack');
const wp = require('webpack');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      '__tests__/**/*-test.js',
      {
        pattern: '__tests__/__fixtures__/**/*.html',
        served: true,
        included: false
      }
    ],
    plugins: [webpack, 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter', 'karma-coverage'],
    browsers: ['PhantomJS'],
    coverageReporter: {
      dir: './docs/coverage',
      reporters: [
        { type: 'lcov', subdir: 'reports' }
      ]
    },
    reporters: ['spec', 'coverage'],
    colors: true,
    preprocessors: {
      '__tests__/**/*-test.js': ['webpack']
    },
    webpack: {
      plugins: [
        new wp.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
      ],
      module: {
        rules: [
          {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
          },
          {
            enforce: 'pre',
            test: /\.js/,
            loader: 'isparta-loader',
            exclude: /(__tests__|node_modules)/
          }
        ]
      }
    },
    webpackMiddleware: { noInfo: true }
  });
};
