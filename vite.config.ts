import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  build: {
    // Generate proper source maps for production
    sourcemap: false, // Disable source maps in production for better performance
    // Minify for production
    minify: 'terser',
    // Enable tree shaking
    rollupOptions: {
      output: {
        // Better chunk splitting for optimal loading
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('markdown') || id.includes('highlight') || id.includes('rehype') || id.includes('remark')) {
              return 'markdown-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
          // App chunks
          if (id.includes('/components/')) {
            return 'components';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
        }
      }
    }
  }
});
