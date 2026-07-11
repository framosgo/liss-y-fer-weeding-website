import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Clara & Mateo Wedding',
        short_name: 'Clara & Mateo',
        description: 'A premium wedding experience with RSVP, travel, and celebration details.',
        theme_color: '#470d13',
        background_color: '#fff8f6',
        display: 'standalone',
        icons: [{ src: '/favicon.svg', sizes: '64x64', type: 'image/svg+xml' }]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
