import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Both plugins, because the quickstart example ships a React file and a Vue
  // single-file component and the same test drives both. A binding that drifts
  // from the other fails here rather than in a reader's editor.
  plugins: [react(), vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./packages/react/src/setupTests.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/.git/**', '**/.claude/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'lcov'],
      include: ['packages/*/src/**/*.{ts,tsx}'],
      // `index.ts` is not excluded: in v1 it is not a barrel but the code - the
      // whole Vue binding lives in one, and leaving it out hid a third of that
      // binding's functions from this report.
      exclude: ['**/*.test.*', '**/*.spec.*', '**/setupTests.ts'],
      // A ratchet, not a target: each number sits just under what the suite
      // measures, so coverage can only go up. The margin is for the property
      // tests, whose random inputs move a branch or two between runs. `core` is
      // held to its own line because an engine bug is every wizard's bug, and
      // the launch plan asks 90% of it.
      thresholds: {
        statements: 92,
        branches: 87,
        functions: 91,
        lines: 94,
        'packages/core/src/**': {
          statements: 95,
          branches: 93,
          functions: 97,
          lines: 98,
        },
      },
    },
  },
});
