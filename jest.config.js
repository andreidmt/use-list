/* eslint-env node */

/** @type {import('@jest/types').Config.InitialOptions} */
export default {
  testEnvironment: "jsdom",
  testMatch: ["**/tests/*.ts(x)?", "**/*.test.ts(x)?"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", {}],
  },

  collectCoverageFrom: ["./src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  coverageReporters: ["lcov", "text"],
  reporters:
    process.env.CI === "true"
      ? [
          "default",
          [
            "jest-junit",
            {
              suiteName: "Unit tests - useCrudState",
              outputDirectory: "./test_reports/unit_tests",
              outputName: "junit.xml",
            },
          ],
        ]
      : ["default"],
}
