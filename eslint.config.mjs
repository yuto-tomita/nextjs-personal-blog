import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
// import reactHooksPlugin from 'eslint-plugin-react-hooks'
import eslintParser from '@typescript-eslint/parser'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // reactHooksPlugin.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        atomics: 'readonly',
      },
      parser: eslintParser
    },
    ignores: ['build/*'],
    // plugins: { tseslint, reactPlugin },
    rules: {
      quotes: ['error', 'single'],
      'arrow-parens': ['error', 'always'],
      'no-empty-function': 'error',
      // 'no-console': 'error',
      'valid-typeof': 'error',
      'keyword-spacing': ['error', { before: true }],
      'arrow-spacing': 'error',
      'no-multi-spaces': 'error',
      'no-duplicate-imports': 'error',
      'space-in-parens': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'no-self-compare': 'error',
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'indent': ['error', 2],
      'key-spacing': ['error', { 'beforeColon': false }],
      'no-multiple-empty-lines': 'error',
      'no-whitespace-before-property': 'error',
      'rest-spread-spacing': ['error', 'never'],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true
        }
      ],
      'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
      'react/jsx-curly-newline': [
        'error',
        { multiline: 'consistent', singleline: 'consistent' }
      ],
      'react/jsx-indent-props': [
        2,
        { indentMode: 2, ignoreTernaryOperator: true }
      ],
      'react/jsx-tag-spacing': ['error'],
      // 'react/jsx-newline': [2, { prevent: true }],
      'react/jsx-indent': [
        2,
        2,
        { indentLogicalExpressions: true, checkAttributes: true }
      ]
    },
  }
]
