module.exports = {
  displayName: "selector-ui-svelte",
  preset: "../../jest.preset.js",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  transform: {
    "^(.+\\.svelte$)": [
      "svelte-jester",
      {
        preprocess: "packages/selector-ui-svelte/svelte.config.cjs",
      },
    ],
    "^.+\\.[tj]s$": "ts-jest",
  },
  moduleFileExtensions: ["svelte", "ts", "js", "html"],
  coverageDirectory: "../../coverage/packages/selector-ui-svelte",
};
