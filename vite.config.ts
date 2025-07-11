import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Modern ESM target for better performance
    target: 'esnext',
    
    // Enable minification
    minify: 'esbuild',
    
    // Optimize CSS
    cssMinify: true,
    
    // Generate source maps for debugging but optimized for production
    sourcemap: false,
    
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          // React ecosystem - важно держать их вместе
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          
          // UI components
          'ui-vendor': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-dropdown-menu', 
            '@radix-ui/react-accordion',
            '@radix-ui/react-avatar',
            '@radix-ui/react-separator'
          ],
          
          // State management
          'state-vendor': ['jotai', 'zustand'],
          
          // Icons 
          'icons-vendor': ['lucide-react'],
          
          // Routing and utilities
          'utils-vendor': ['react-router-dom', 'react-resizable-panels']
        },
        
        // Optimize asset file names for caching
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name ?? '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name ?? '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          
          return `assets/[name]-[hash][extname]`;
        },
        
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
      
      // External dependencies for CDN loading (optional)
      // external: ['react', 'react-dom'] // Uncomment if using CDN
    },
    
    // Optimize for modern browsers
    modulePreload: {
      polyfill: false
    },
  },
  
  // Optimize development server
  server: {
    // Optimize HMR
    hmr: {
      overlay: false
    }
  },
  
  // Optimize preview server
  preview: {
    port: 4173,
    strictPort: true,
    
    // Enable compression
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    }
  },
  
  // ESBuild optimizations
  esbuild: {
    // Remove console logs and debugger in production
    drop: ['console', 'debugger'],
    
    // Optimize for smaller bundle size
    treeShaking: true,
    
    // Use modern JS features
    target: 'esnext',
    
    // Additional minification
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },
  
  // CSS optimizations
  css: {
    // PostCSS optimizations
    postcss: {
      plugins: [
        // Add autoprefixer and other optimizations if needed
      ]
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    // Pre-bundle these dependencies
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'jotai',
      'zustand',
      'lucide-react'
    ],
    
    // Exclude these from pre-bundling
    exclude: ['@vite/client', '@vite/env']
  }
})