import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./packages/react/src/setupTests.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/.git/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'lcov'],
      include: ['packages/*/src/**/*.{ts,tsx}'],
      exclude: [
        'packages/ui/**',
        '**/*.test.*',
        '**/*.spec.*',
        '**/setupTests.ts',
        '**/index.ts',
        '**/types.ts',
      ],
      // A ratchet, not a target: these sit just under what the 0.x suite covers
      // today, so coverage can only go up. v1 `core` is held to 90% separately
      // once it exists — most of the gap here is the untested context-free path
      // that v1 deletes outright.
      thresholds: {
        statements: 38,
        branches: 28,
        functions: 34,
        lines: 40,
      },
    },
  },
});
