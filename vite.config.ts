import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 關鍵：使用相對路徑，這樣部署到任何 GitHub Pages 子路徑都能運作
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});