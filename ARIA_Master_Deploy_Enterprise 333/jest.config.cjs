const { createDefaultPreset } = require('ts-jest/presets');
const tsJestTransform = createDefaultPreset().transform;

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    ...tsJestTransform,
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
