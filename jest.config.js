module.exports = {
  moduleFileExtensions: [
   "ts",
   "tsx",
   "js"
  ],
  transform: {
   "^.+\\.tsx?$": "ts-jest",
   "^.+\\.(js|jsx)$": "babel-jest"
  },
  testMatch: [
   "**/*.(test|spec).(ts|tsx)"
  ],
  globals: {
   "ts-jest": {
     babelConfig: true,
     tsConfig: "tsconfig.jest.json",
     diagnostics: false
   }
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  coveragePathIgnorePatterns: [
  "/node_modules/",
  "enzyme.js"
 ],
  coverageReporters: [
  "json",
   "lcov",
   "text",
   "text-summary"
  ],
  collectCoverageFrom: ['src/*.ts','src/**/*.{ts,tsx}', 'src/**/**/*.{ts,tsx}'],
  moduleNameMapper:{
   "\\.scss$": "<rootDir>/__mocks__/styleMock.js",
  }
};