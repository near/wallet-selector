module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 6,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "prettier",
    "react",
    "react-hooks"
  ],
  rules: {
    "prettier/prettier": ["error", require("./prettier.config")],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/naming-convention": ["error", {
      "selector": "variableLike",
      "format": ["camelCase", "PascalCase", "UPPER_CASE"]
    }],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/ban-ts-ignore": "off",
    "eqeqeq": ["error", "smart"],
    "default-case": "off",
    "no-caller": "error",
    "no-case-declarations": "off",
    "no-console": ["warn", { allow: ["error", "info", "warn"] }],
    "no-debugger": "error",
    "no-eval": "error",
    "no-fallthrough": "error",
    "no-labels": "warn",
    "no-redeclare": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-unused-expressions": "error",
    "radix": ["error", "as-needed"],
    "no-restricted-syntax": [
      "error",
      {
        "selector": "CallExpression[callee.name!='parseInt'] > Identifier[name='parseInt']",
        "message": "Call parseInt directly to guarantee radix param is not incorrectly provided"
      },
      "error",
      {
        "selector": "CallExpression[callee.name!='parseFloat'] > Identifier[name='parseFloat']",
        "message": "Call parseFloat directly to guarantee radix param is not incorrectly provided"
      }
    ],
    "strict": ["error", "global"],
    "valid-jsdoc": "error",
    "react/jsx-uses-react": "error",
    "react/react-in-jsx-scope": "error",
    "react/jsx-no-target-blank": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/display-name": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}