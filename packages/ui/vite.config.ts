import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  base: '/wizzard-packages/',
  plugins: [react()],
  resolve: {
    alias: {
      '@wizzard-packages/react': path.resolve(__dirname, '../react/src'),
      '@wizzard-packages/core': path.resolve(__dirname, '../core/src'),
    },
  },
});
