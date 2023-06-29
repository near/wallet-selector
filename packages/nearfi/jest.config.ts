/* eslint-disable */
module.exports = {
  displayName: "nearfi",
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
  coverageDirectory: "../../coverage/packages/nearfi",
};
