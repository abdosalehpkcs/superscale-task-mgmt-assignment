// Karma configuration
// Generated on Mon Jul 31 2023 17:39:29 GMT+0200 (Central European Summer Time)

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine'],

    plugings: [
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('karma-chrome-launcher'),
    ],

    client: {
      jasmine: {
        random: false,
      },
      clearContext: false,
    },

    jasmineHtmlReporter: {
      suppressAll: true, // Suppress all messages (overrides other suppress settings)
    },

    junitReporter: {
      outputDir: 'artifacts/tests',
      outputFile: 'junit-test-results.xml',
      useBrowserName: true,
    },

    coverageReporter: {
      dir: './coverage/superscale-mgmt',
      subdir: '',
      reporters: [{ type: 'html', subdir: 'html-report' }],
      check: {
        global: {
          statments: 90,
          branches: 90,
          functions: 90,
          lines: 90,
        },
      },
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress', 'kjhtml', 'junit', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    failOnEmptyTestSuite: false,

    browserNoActivityTimeout: 30000,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    customLaunchers: {
      Chrome_with_debugging: {
        base: 'Chrome',
        chromeDataDir: require('path').resolve(__dirname, '.chrome'),
      },
    },

    restartOnFileChange: true,
  });
};
