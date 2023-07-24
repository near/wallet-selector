/* eslint-disable */
module.exports = {
  displayName: "coin98-wallet",
  preset: "../../jest.preset.js",
  globals: {},
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/packages/coin98-wallet",
};
