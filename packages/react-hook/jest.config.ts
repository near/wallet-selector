/* eslint-disable */
export default {
  displayName: "react-hook",
  preset: "../../jest.preset.js",
  globals: {},
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/../../jest.init.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!@near-wallet-selector)",
  ],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/packages/react-hook",
  moduleNameMapper: {
    "^@near-wallet-selector/core$": "<rootDir>/../../packages/core/src/index.ts",
    "^@near-wallet-selector/modal-ui$": "<rootDir>/../../packages/modal-ui/src/index.ts",
  },
};
