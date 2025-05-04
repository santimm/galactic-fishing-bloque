import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Galactic Fishing App - Bloque',
        short_name: 'GalacticFishingApp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#333333'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        runtimeCaching: [
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 3600
              }
            }
          },
          {
            urlPattern: /^https:\/\/api-game\.bloque\.app\/game\/leaderboard/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'leaderboardList-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 3600 }
            }
          },
          {
            urlPattern: /^https:\/\/api-game\.bloque\.app\/game\/market/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'marketList-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 3600 }
            }
          }
        ]
      }
    }),
    visualizer({ open: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/styles/variables.less";`
      }
    }
  }
})
