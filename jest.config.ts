import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  cacheDirectory: ".jest/cache",
  moduleFileExtensions: ["js", "ts", "tsx"],
  testMatch: ["**/__tests__/**/*.(unit)\\.(ts|tsx)", "**/*.(spec)\\.(ts|tsx)"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.init.ts"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  }
};

export default config;
