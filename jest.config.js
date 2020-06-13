module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme',
  moduleNameMapper: {
    '\\.(s?css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/examples/',
    '<rootDir>/modules/',
    '<rootDir>/storybook-static/',
  ],
};
