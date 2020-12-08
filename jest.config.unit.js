const config = require("./jest.config");

module.exports = {
  ...config,
  testPathIgnorePatterns: [
    ".*\.integration.test.ts"
  ]
}
