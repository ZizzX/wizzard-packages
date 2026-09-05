import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // jsdom, because these are browser plugins: `pagehide` and a storage that
    // throws on access are the paths worth testing, and neither exists in node.
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.ts'],
  },
});
