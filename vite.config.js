import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/nobin-photorealistic-AI/' : '/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist'
  }
}));