module.exports = {
  preset: 'react-native',
  setupFiles: ['./__tests__/jest.setup.js'],
  transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
};
