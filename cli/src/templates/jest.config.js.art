module.exports = {
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'vue', 'jsx', 'ts', 'tsx', 'node', 'json'],
  testMatch: [ // 匹配测试用例的文件
    '<rootDir>/__test__/**/*.spec.(js|jsx|ts|tsx)'
  ],
  snapshotSerializers: ['jest-serializer-vue'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  // 支持源代码中相同的 `@` -> `src` 别名
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
