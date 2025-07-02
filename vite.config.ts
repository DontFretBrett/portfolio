import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
    // Add gzip compression for production
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Add brotli compression for even better compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    })
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
    include: ['buffer', 'react', 'react-dom', 'react/jsx-runtime'],
  },
  build: {
    // Disable source maps for production for better performance and security
    sourcemap: false,
    // Enable minification for production
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true,
        drop_debugger: true,
        // Remove unused code
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        // Mangle variable names for smaller bundle size
        safari10: true
      }
    },
    // Reduce chunk size limit warnings
    chunkSizeWarningLimit: 1000,
    // Enable tree shaking and compression
    rollupOptions: {
      output: {
        // Better code splitting
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          markdown: ['react-markdown', 'rehype-highlight', 'rehype-raw', 'remark-gfm']
        },
        compact: true
      }
    },
    // Target modern browsers for smaller bundle size
    target: 'esnext',
    // Enable CSS code splitting
    cssCodeSplit: true
  }
});
