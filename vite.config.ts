import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { VitePWA } from 'vite-plugin-pwa'
// import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import generateSitemap from 'vite-ssg-sitemap'
import VueJsxVapor from 'vue-jsx-vapor/vite'
import 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    // https://github.com/vuejs/vue-jsx-vapor
    VueJsxVapor({
      interop: true,
      macros: true,
    }),
    Vue(),
    VueJsx(),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue', '.tsx'],
      dts: 'src/typed-router.d.ts',
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      extensions: ['tsx', 'vue'],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/head',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
        {
          vue: ['defineVaporComponent'],
        },
      ],
      resolvers: [
        {
          type: 'component',
          resolve: (name) => {
            if (['RouterLink', 'RouterView'].includes(name)) {
              return {
                name,
                from: 'vue-router',
              }
            }
          },
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/directives',
        'src/components',
        'src/composables',
        'src/stores',
      ],
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Vitesse',
        short_name: 'Vitesse',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    // VueDevTools(),
    Inspect(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    beastiesOptions: {
      reduceInlineStyles: false,
    },
    onFinished() {
      generateSitemap()
    },
  },

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['workbox-window'],
  },
})
