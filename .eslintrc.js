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
    "arrow-spacing": "error",
    "no-multi-spaces": "error",
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": true
    }],
    "react/jsx-wrap-multilines": ["error", {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "parens-new-line"
    }],
    "react/jsx-closing-bracket-location": 1,
    "react/jsx-closing-bracket-location": [1, 'tag-aligned'],
    "react/jsx-closing-bracket-location": [1, 'line-aligned'],
    "react/jsx-curly-newline": ["error", { multiline: "consistent", singleline: "consistent" }],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-indent": [2, 2, {indentLogicalExpressions: true}],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-max-props-per-line": ["error"],
    "react/jsx-tag-spacing": ["error"],
    "react/jsx-newline": [2, {"prevent": true}]
  },
  settings: { react: { version: "detect" } },
};