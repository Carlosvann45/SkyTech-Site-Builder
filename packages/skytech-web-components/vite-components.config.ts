import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'custom',
  plugins: [],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        dir: './dist/',
        entryFileNames: 'index.js',
        assetFileNames: 'index.css'
      }
    }
  }
});