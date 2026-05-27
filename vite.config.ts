import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // Correctly point @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      minify: 'esbuild' as const,
      cssMinify: true,
      // Skip compressed size reporting for faster builds
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion': ['motion/react'],
            'vendor-lenis': ['lenis'],
            'vendor-lucide': ['lucide-react'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'motion/react', 'lenis', 'lucide-react'],
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
