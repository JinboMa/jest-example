module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  'setupFiles': [
    '<rootDir>/tests/unit/setup/index.js'
  ],
  'coverageDirectory': '<rootDir>/tests/unit/coverage',
  'collectCoverage': true,
  'collectCoverageFrom': [
    '<rootDir>/src/utils/*.{js|vue}',
    '!**/node_modules/**'
  ],
  'coverageReporters': [
    'html'
  ],
  testURL: 'http://localhost/'
}
