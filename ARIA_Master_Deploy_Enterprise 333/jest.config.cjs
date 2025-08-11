const { defaultsESM: tsJestPreset } = require('ts-jest/presets');

module.exports = {
  testEnvironment: 'node',
  transform: {
    ...tsJestPreset.transform,
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
