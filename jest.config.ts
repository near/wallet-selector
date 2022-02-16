import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  cacheDirectory: ".jest/cache",
  moduleFileExtensions: ["js", "ts", "tsx"],
  testMatch: ["**/*.(spec)\\.(ts|tsx)"],
  testPathIgnorePatterns: ["/node_modules/", "/example/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.init.ts"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
};

export default config;
