import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: true,
    minify: true,
    external: ['react', 'react-dom', 'zod', 'yup'],
    env: {
        VERSION: process.env.npm_package_version || '2.0.0', // Fallback for safety
    }
});
