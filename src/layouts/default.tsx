import { VaporRouterView } from 'vue-router'
import TheFooter from '../components/TheFooter'

export default defineVaporComponent(() => {
  return (
    <main
      px-4
      py-10
      text="center gray-700 dark:gray-200"
    >
      <VaporRouterView v-slot={{ Component }}>
        {Component}
      </VaporRouterView>
      <TheFooter />
      <div mx-auto mt-5 text-center text-sm opacity-50>
        [Default Layout]
      </div>
    </main>
  )
})
