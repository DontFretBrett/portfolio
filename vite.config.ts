import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteImageOptimize from 'vite-plugin-imagemin';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 85 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
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
    include: ['buffer'],
  },
  build: {
    // Generate proper source maps for production
    sourcemap: false, // Disable source maps in production for better performance
    // Minify for production with aggressive settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log statements
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
        passes: 2 // Multiple passes for better compression
      },
      mangle: {
        toplevel: true // More aggressive variable name mangling
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
