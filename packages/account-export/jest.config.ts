/* eslint-disable */
export default {
  displayName: "account-export",
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
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../coverage/packages/account-export",
};
