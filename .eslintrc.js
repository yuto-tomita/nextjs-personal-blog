module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    React: "writable",
  },
  ignorePatterns: ["build"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    quotes: ["error", "single"],
    "arrow-parens": ["error", "always"],
    "no-empty-function": "error",
    "no-console": "error",
    "valid-typeof": "error",
    "keyword-spacing": ["error", { "before": true }],
    "arrow-spacing": "error"
  },
  settings: { react: { version: "detect" } },
};