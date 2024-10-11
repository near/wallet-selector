/* eslint-disable */
export default {
  displayName: "my-near-wallet",
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
  coverageDirectory: "../../coverage/packages/my-near-wallet",
};
