const config = require("./jest.config");

module.exports = {
  ...config,
  testMatch: [
    "**/?(*.)+(integration.test).ts"
  ]
}
