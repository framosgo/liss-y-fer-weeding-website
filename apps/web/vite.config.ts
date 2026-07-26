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
        name: 'Boda de Liss y Fer',
        short_name: 'Liss y Fer',
        description: 'Una experiencia premium para la boda, con RSVP, viaje y detalles de la celebración.',
        theme_color: '#828256',
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
