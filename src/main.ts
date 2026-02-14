import type { UserModule } from './types'
import { setupLayouts } from 'virtual:generated-layouts'

// import { ViteSSG } from 'vite-ssg'
import { createVaporApp, vaporInteropPlugin } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import App from './App'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes as any),
})
const app = createVaporApp(App)
  .use(vaporInteropPlugin)
  .use(router)
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  // @ts-expect-error app type is error
  .forEach(i => i.install?.({ isClient: true, router, app }))
app.mount('#app')

// https://github.com/antfu/vite-ssg
// export const createApp = ViteSSG(
//   App,
//   {
//     routes: setupLayouts(routes),
//     base: import.meta.env.BASE_URL,
//   },
//   (ctx) => {
//     // install all modules under `modules/`
//     Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
//       .forEach(i => i.install?.(ctx))
//     ctx.app.use(vaporInteropPlugin)
//   },
// )
