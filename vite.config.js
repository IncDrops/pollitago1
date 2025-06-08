import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './public', // The root for Vite is now the public folder where index.html resides
  plugins: [react()],
  build: {
    outDir: 'build', // Output to 'build' in the overall project root C:\pollitago_app
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001', // Your backend runs on 3001
    },
  },
});