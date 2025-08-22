import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  target: 'es2020',
  globalName: 'EnvSnap',
  platform: 'browser',
  // Export the class directly for IIFE build
  footer: {
    js: `if (typeof window !== 'undefined' && window.EnvSnap && window.EnvSnap.default) {
      window.EnvSnap = window.EnvSnap.default;
    }`,
  },
});