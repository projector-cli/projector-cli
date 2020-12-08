process.env.NODE_OPTIONS = '--unhandled-rejections=throw'

module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    // Don't test anything in the test/ directory (test utilities and such)
    "!src/test/**/*.ts",
    "!src/scripts/**/*.ts",
    "!src/**/index.ts"
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      functions: 90,
      lines: 90,
      branches: 75,
    },
  },
  testEnvironment: "node",
  transform: {
    "^.+\\.(js)$": "babel-jest",
    "^.+\\.(ts)$": "ts-jest",
  },
  testPathIgnorePatterns: [
    "./lib",
    "./node_modules"
  ],
  transformIgnorePatterns: [
    "./lib",
    "./node_modules"
  ],
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "node"
  ],
  setupFiles: [
    "dotenv/config"
  ],
  setupFilesAfterEnv: [
    "./jest.setup.js"
  ],
};
