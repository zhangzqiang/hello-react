const path = require ('path');

module.exports = {
  rootDir: path.resolve (__dirname, '../'),
  // 是否收集测试时的覆盖率信息
  collectCoverage: true,
  // 哪些文件需要收集覆盖率信息
  collectCoverageFrom: ['src/util/**/*.{js,jsx,mjs}'],
  // 输出覆盖信息文件的目录
  coverageDirectory: '<rootDir>/test/coverage',
  // 统计覆盖信息时需要忽略的文件
  coveragePathIgnorePatterns: ['/node_modules/'],
  // 主要用于与webpack的resolve.alias匹配，注意正则写法
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '^util(.*)$': '<rootDir>/src/util$1',
  },
  // 匹配的测试文件
  testMatch: ['<rootDir>/test/*.{js,jsx,mjs}'],
  // 运行环境下的url
  testURL: 'localhost:3000',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
  },
  // 转换时需要忽略的文件
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
};
