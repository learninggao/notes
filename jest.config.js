const path = require('path') // eslint-disable-line

module.exports = {
  moduleNameMapper: {
    '^(.*).scss$': path.resolve(__dirname, 'tools/testing/mock.styles.ts'),
  },
  roots: ['<rootDir>/src', '<rootDir>/backend'],
  setupFilesAfterEnv: [path.resolve(__dirname, 'tools/testing/jest.setup.ts')],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
}
