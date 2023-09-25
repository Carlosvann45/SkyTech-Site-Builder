import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'custom',
  plugins: [],
  build: {
    outDir: 'dist',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'SkyTechWebComponents',
      // the proper extensions will be added
      fileName: 'skytech-web-components',
    }
  }
});