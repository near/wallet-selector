module.exports = {
  parserOptions: {
    project: ["tsconfig.json"],
  },

  extends: [
    "../.eslintrc.js",
  ],

  rules: {
    "prettier/prettier": [ "error", require("./../prettier.config") ],
    "no-console": "off",
  }
}
