const path = require('path') // eslint-disable-line

module.exports = {
  moduleNameMapper: {
    '^(.*).scss$': path.resolve(__dirname, 'tools/testing/mock.styles.ts'),
  },
  setupFilesAfterEnv: [path.resolve(__dirname, 'tools/testing/jest.setup.ts')],
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
}
