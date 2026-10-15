import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

function normalizeBasePath(value?: string) {
  const path = value?.trim();
  if (!path || path === '/') return '/';
  return `/${path.replace(/^\/+|\/+$/g, '')}/`;
}

const base = normalizeBasePath(process.env.VITE_BASE_PATH);

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon-v2.png', 'pwa-192x192-v2.png', 'pwa-512x512-v2.png'],
      manifest: {
        id: './',
        name: 'GYMRATS',
        short_name: 'GYMRATS',
        lang: 'pt-BR',
        description: 'Treinos ABC, cargas e evolução — sempre no seu ritmo.',
        theme_color: '#0b0f17',
        background_color: '#0b0f17',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: './',
        scope: './',
        icons: [
          { src: 'pwa-192x192-v2.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512-v2.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512-v2.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html}'],
      },
    }),
  ],
});
