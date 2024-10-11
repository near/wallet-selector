/* eslint-disable */
export default {
  displayName: "wallet-utils",
  preset: "../../jest.preset.js",
  globals: {},
  transform: {
    "^.+\\.[tj]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/delme-tsconfig.spec.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/packages/wallet-utils",
};
