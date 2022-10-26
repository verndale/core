const path = require("path");
const puppeteer = require("puppeteer");

process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      "__tests__/**/*-test.ts",
      "src/**/*.ts",
      {
        pattern: "__tests__/__fixtures__/**/*.html",
        served: true,
        included: false,
      },
    ],
    plugins: [
      "karma-typescript",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-spec-reporter",
      "karma-coverage-istanbul-reporter",
    ],
    browsers: ["ChromeHeadless"],
    coverageReporter: {
      dir: path.join(__dirname, "docs/coverage"),
      reporters: [{ type: "lcov", subdir: "reports" }],
    },
    coverageIstanbulReporter: {
      dir: path.join(__dirname, "docs/coverage"),
    },
    reporters: ["spec", "karma-typescript", "coverage-istanbul"],
    colors: true,
    preprocessors: {
      "**/*.ts": ["karma-typescript"],
    },
  });
};
