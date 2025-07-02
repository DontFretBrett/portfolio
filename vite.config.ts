import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
    // Removed vite-plugin-imagemin due to security vulnerabilities
    // Images should be pre-optimized before committing to repo
  ],
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
    sourcemap: true, // Enable source maps temporarily to debug
    // Minify for production with aggressive settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs temporarily
        drop_debugger: false,
      }
    },
    // Reduce chunk size limit warnings
    chunkSizeWarningLimit: 1000,
    // Enable tree shaking and compression
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
        },
        // Compress output
        compact: true
      }
    }
  }
});
