import { defineConfig } from 'vite';
import { resolve } from 'path';
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'custom',
  plugins: [nodePolyfills()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      external: ['fs', 'node:path'],
      output: {
        globals: {
          fs: 'fs',
          'node:path': 'path'
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