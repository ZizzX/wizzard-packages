import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const uiBase = process.env.UI_BASE || '/';
const repoRoot = path.resolve(__dirname, '../..');

export default defineConfig({
  base: uiBase,
  plugins: [react()],
  resolve: {
    alias: {
      '@wizzard-packages/react': path.resolve(__dirname, '../react/src'),
      '@wizzard-packages/core': path.resolve(__dirname, '../core/src'),
    },
  },
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
});
