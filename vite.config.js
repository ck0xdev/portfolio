import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Warn when chunks exceed 500 KB
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Separate vendor chunk for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },

    // Generate source maps for production debugging
    sourcemap: false,

    // Minification
    minify: 'esbuild',

    // Target modern browsers
    target: 'es2020',
  },

  // Dev server configuration
  server: {
    open: true,
    port: 5173,
    strictPort: false,
  },
});
