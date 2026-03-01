import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      // React 19 optimizations
      jsxImportSource: 'react',
      babel: {
        plugins: [
          // Add any React 19 specific babel plugins here if needed
        ]
      }
    }),
    // Add gzip compression for production
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
    }),
    // Add brotli compression for even better compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    })
  ],
  
  // Path resolution for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@data': path.resolve(__dirname, './src/data'),
      buffer: 'buffer',
    },
  },
  
  define: {
    global: 'globalThis',
  },
  
  optimizeDeps: {
    include: [
      'buffer', 
      'react', 
      'react-dom', 
      'react/jsx-runtime',
      'framer-motion',
      'react-router-dom'
    ],
    // Exclude large dependencies that should be loaded on demand
    exclude: ['@giscus/react']
  },
  
  build: {
    // Disable source maps for production for better performance and security
    sourcemap: false,
    
    // Enable minification for production with enhanced settings
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true,
        drop_debugger: true,
        // Remove unused code more aggressively
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Multiple passes for better compression
        unsafe: false, // Disable unsafe optimizations to prevent React import issues
      },
      mangle: {
        // Mangle variable names for smaller bundle size
        safari10: true,
        toplevel: false, // Don't mangle top-level to preserve module exports
        reserved: ['React', 'createContext', 'useContext', 'useState', 'useEffect'], // Preserve React APIs
      },
      format: {
        comments: false, // Remove all comments
      }
    },
    
    // Reduce chunk size limit warnings
    chunkSizeWarningLimit: 1000,
    
    // Enable tree shaking and compression
    rollupOptions: {
      output: {
        // Enhanced code splitting strategy
        manualChunks: (id) => {
          // Vendor libraries
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
            if (id.includes('helmet')) {
              return 'seo-vendor';
            }
            return 'vendor';
          }
          
          // App chunks by feature
          if (id.includes('/components/')) return 'components';
          if (id.includes('/pages/')) return 'pages';
          if (id.includes('/utils/')) return 'utils';
          if (id.includes('/data/')) return 'data';
        },
        compact: true,
        
        // Optimize chunk file names
        chunkFileNames: `assets/js/[name]-[hash].js`,
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          let extType = info[info.length - 1] || '';
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          
          return `assets/${extType}/[name]-[hash][extname]`;
        }
      }
    },
    
    // Target modern browsers for smaller bundle size
    target: ['es2022', 'chrome87', 'firefox78', 'safari14', 'edge88'],
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Optimize CSS
    cssMinify: true,
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Optimize for modern features
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
  },
  
  // Preview configuration for testing builds
  preview: {
    port: 4173,
    strictPort: true,
  },
  
  // Enhanced dev server
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    open: true,
  }
});
