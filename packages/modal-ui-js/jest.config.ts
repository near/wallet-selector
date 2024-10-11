/* eslint-disable */
export default {
  displayName: "modal-ui-js",
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
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../coverage/packages/modal-ui-js",
};
