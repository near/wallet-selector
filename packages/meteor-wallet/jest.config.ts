/* eslint-disable */
export default {
  displayName: "meteor-wallet",
  preset: "../../jest.preset.js",
  globals: {},
  transform: {
    "^.+\\.[tj]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/packages/meteor-wallet",
  moduleNameMapper: {
    // This is a workaround for https://github.com/uuidjs/uuid/pull/616
    '^uuid$': require.resolve('uuid'),
    '^nanoid$': require.resolve('nanoid')
  },
};