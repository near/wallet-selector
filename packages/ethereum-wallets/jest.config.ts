/* eslint-disable */
export default {
  displayName: "ethereum-wallets",
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
  coverageDirectory: "../../coverage/packages/ethereum-wallets",
};
