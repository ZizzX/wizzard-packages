import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            '**/dist/**',
            '**/node_modules/**',
            'examples/demo/**', // Demo has its own config
            '.stackblitz/**',
            'playwright-report/**',
            'test-results/**',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['packages/**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            // TypeScript rules
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-unused-expressions': 'error',

            // Import rules
            'no-unused-vars': 'off', // Use TypeScript version instead
            'no-duplicate-imports': 'error',

            // Code quality
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'prefer-const': 'error',
            'no-var': 'error',
        },
    },
];
