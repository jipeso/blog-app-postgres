import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  globalIgnores(['node_modules/**']),
  {
    files: ['**/*.js'],
    plugins: {
      js,
    },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'error',
    },
  },
  prettier,
])
