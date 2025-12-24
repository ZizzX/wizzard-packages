import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    root: __dirname,
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion': ['framer-motion'],
            'vendor-forms': ['formik', 'yup', 'zod', 'react-hook-form', '@hookform/resolvers'],
          },
        },
      },
    },
    plugins: [react()],
    base: '/wizzard-stepper-react/',
    resolve: {
      alias: {
        'wizzard-stepper-react': path.resolve(__dirname, '../../src/index.ts'),
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        'yup': path.resolve(__dirname, './node_modules/yup'),
        'zod': path.resolve(__dirname, './node_modules/zod'),
      },
    },
  };
});
