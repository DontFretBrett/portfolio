import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
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
    // Generate proper source maps for production
    sourcemap: true, // Enable source maps temporarily to debug
    // Minify for production with aggressive settings
    minify: false, // Disable minification temporarily to debug
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
        // Let Vite handle chunking automatically
        compact: true
      }
    }
  }
});
