module.exports = {
  verbose: true,
  bail: 2,
  collectCoverage: false,
  preset: "@shelf/jest-mongodb",
  testTimeout: 20000,
  setupFilesAfterEnv: ["./jest.global.js"],
};
