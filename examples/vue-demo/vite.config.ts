import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/wizzard-packages/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@wizzard-packages/vue': path.resolve(__dirname, '../../packages/vue/src'),
      '@wizzard-packages/core': path.resolve(__dirname, '../../packages/core/src'),
      '@wizzard-packages/adapter-zod': path.resolve(__dirname, '../../packages/adapter-zod/src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
  },
});
