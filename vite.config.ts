import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      '/api/jira': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
});