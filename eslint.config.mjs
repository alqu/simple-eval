import chaiExpect from 'eslint-plugin-chai-expect';
import chaiFriendly from 'eslint-plugin-chai-friendly';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends('eslint:recommended', 'plugin:prettier/recommended'),
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {},
      sourceType: 'module',
    },

    rules: {
      'func-names': 'off',
      'global-require': 'warn',
      'no-continue': 'off',
      'no-label-var': 'off',
      'no-labels': 'off',
      'no-param-reassign': 'warn',
      'no-restricted-syntax': ['error', 'ArrayPattern'],
      'no-undefined': 'error',
      'no-void': 'off',
      'prettier/prettier': 'error',
      'sort-keys': 'error',
    },
  },
  ...compat.extends('plugin:chai-expect/recommended').map((config) => ({
    ...config,
    files: ['src/__tests__/**/*.mjs'],
  })),
  {
    files: ['src/__tests__/**/*.mjs'],

    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.node,
        expect: true,
      },
    },

    plugins: {
      'chai-expect': chaiExpect,
      'chai-friendly': chaiFriendly,
    },

    rules: {
      'chai-friendly/no-unused-expressions': 2,
      'no-unused-expressions': 0,
    },
  },
];
