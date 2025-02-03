/* eslint-disable */
export default {
  displayName: "react-hook",
  preset: "ts-jest",
  globals: {},
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!@wallet-selector/react-hook)",
  ],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/packages/react-hook",
};
