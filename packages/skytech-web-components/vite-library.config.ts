import { defineConfig } from 'vite';
import { resolve } from 'path';
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'custom',
  plugins: [nodePolyfills({ include: null })],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      external: ['fs'],
      output: {
        globals: {
          fs: 'fs'
        }
      }
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'SkyTechWebComponents',
      // the proper extensions will be added
      fileName: 'skytech-web-components',
    }
  }
});