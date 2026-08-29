import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import importX from 'eslint-plugin-import-x';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

/**
 * Layout:
 *   1. ignores
 *   2. baseline for every file
 *   3. type-aware strict rules for shipped library source
 *   4. framework-specific rules (react hooks, vue)
 *   5. relaxed rules for tests, examples and e2e
 *   6. LEGACY QUARANTINE — shrink this list, never grow it
 */
export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '.stackblitz/**',
      'docs/api/**',
      'playwright-report/**',
      'test-results/**',
      '.beads/**',
      // Standalone example with its own flat config (react-refresh plugin).
      'examples/shadcn-ui-connector/**',
      '**/*.bak',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { 'import-x': importX },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-duplicate-imports': 'error',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-duplicates': 'error',
    },
  },

  // Shipped library source: strict, type-aware.
  {
    files: ['packages/*/src/**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}', '**/setupTests.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },

  {
    files: ['packages/{react,devtools}/src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },

  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.vue'] },
    },
  },

  // Tests, examples, e2e and tooling: correctness only, no ceremony.
  {
    files: [
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      'e2e/**/*.{ts,tsx}',
      'examples/**/*.{ts,tsx,vue}',
      '**/*.config.{ts,js,mjs,cjs}',
      '**/setupTests.ts',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'import-x/order': 'off',
      'no-console': 'off',
      'no-duplicate-imports': 'off',
    },
  },

  {
    files: ['examples/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  // ── V1 ENGINE ───────────────────────────────────────────────────────────────
  // The invariant the whole design rests on: state is written in exactly one
  // place, so an aborted navigation can never leave a partial write behind.
  // Enforced mechanically, because "everyone remembers to" is not a guarantee.
  {
    files: ['packages/core/src/v1/**/*.ts'],
    ignores: ['packages/core/src/v1/commit.ts', 'packages/core/src/v1/**/*.test.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'AssignmentExpression > MemberExpression[object.name="state"]',
          message: 'State is written only in commit.ts.',
        },
        {
          selector:
            'CallExpression[callee.object.name="Object"][callee.property.name="assign"] > Identifier:first-child[name="state"]',
          message: 'State is written only in commit.ts.',
        },
      ],
    },
  },

  // ── LEGACY QUARANTINE ───────────────────────────────────────────────────────
  // The 0.x engine and its duplicated framework layers. These files are replaced
  // wholesale by the v1 packages; linting them to the new standard would only
  // produce noise on code scheduled for deletion.
  // Remove an entry the moment its replacement lands. Never add one.
  {
    // `ignores` inside a config object subtracts from `files`: v1 source lives
    // under packages/core/src/v1 and is held to the full standard.
    ignores: ['packages/core/src/v1/**'],
    files: [
      'packages/core/src/**',
      'packages/react/src/**',
      'packages/vue/src/**',
      'packages/devtools/src/**',
      'packages/middleware/src/**',
      'packages/persistence/src/**',
      'packages/adapter-zod/src/**',
      'packages/adapter-yup/src/**',
      'packages/ui/src/**',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      'import-x/order': 'off',
      'object-shorthand': 'off',
      eqeqeq: 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-duplicate-imports': 'off',
      'no-case-declarations': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];
