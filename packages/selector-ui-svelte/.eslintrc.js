module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["svelte3", "@typescript-eslint"],
  extends: ["../../.eslintrc.json"],
  ignorePatterns: ["!**/*", "vitest.config.ts"],
  overrides: [
    {
      files: ["*.ts", "*.js", "*.svelte"],
      parserOptions: {
        project: ["packages/selector-ui-svelte/tsconfig.*?.json"],
      },
      rules: {},
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {},
    },
    {
      files: ["*.js", "*.jsx"],
      rules: {},
    },
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  settings: {
    "svelte3/typescript": require("typescript"),
  },
};
