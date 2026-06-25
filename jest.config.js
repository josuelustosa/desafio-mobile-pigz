module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|@reduxjs|redux|redux-persist|immer|reselect|@react-native-async-storage|@react-navigation)/)',
  ],
};
