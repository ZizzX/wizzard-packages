import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Workspace aliases for development (pointing to source)
      '@wizzard-packages/react': path.resolve(__dirname, '../../packages/react/src/index.ts'),
      '@wizzard-packages/core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@wizzard-packages/adapter-zod': path.resolve(
        __dirname,
        '../../packages/adapter-zod/src/index.ts'
      ),

      // Dedupe React
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
});
