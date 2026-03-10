const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.username = process.env.USERNAME;
      config.env.password = process.env.PASSWORD;
      return config;
    },
  },
});
