const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    excludeSpecPattern: [
      "**/cypress/e2e/1-getting-started/**",
      "**/cypress/e2e/2-advanced-examples/**",
    ],
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
