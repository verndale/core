const path = require('path');
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
    plugins: [webpack, 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter', 'karma-coverage-istanbul-reporter'],
    browsers: ['PhantomJS'],
    coverageReporter: {
      dir: path.join(__dirname, 'docs/coverage'),
      reporters: [
        { type: 'lcov', subdir: 'reports' }
      ]
    },
    coverageIstanbulReporter: {
      dir: path.join(__dirname, 'docs/coverage'),
    },
    reporters: ['spec', 'coverage-istanbul'],
    colors: true,
    preprocessors: {
      '__tests__/**/*-test.js': ['webpack']
    },
    webpack: {
      mode: 'development',
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
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.js/,
            enforce: 'post',
            exclude: /(__tests__|node_modules)/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            }
          }
        ]
      }
    },
    webpackMiddleware: { noInfo: true }
  });
};
