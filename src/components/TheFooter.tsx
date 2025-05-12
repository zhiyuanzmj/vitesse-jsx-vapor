import { routes } from 'vue-router/auto-routes'

export default defineComponent(() => {
  const router = useRouter()

  return (
    <>
      <nav flex="~ gap-4" mt-6 justify-center text-xl>
        <button icon-btn onClick={() => router.push('/')} title="Home">
          <div i-carbon-campsite />
        </button>

        <button icon-btn title="Toggle dark mode" onClick={() => toggleDark()}>
          <div i="carbon-sun dark:carbon-moon" />
        </button>

        <a icon-btn rel="noreferrer" href="https://github.com/zhiyuanzmj/vitesse-jsx-vapor" target="_blank" title="GitHub">
          <div i-carbon-logo-github />
        </a>
      </nav>

      <div mb-3 mt-6 op70>
        Other pages:
      </div>
      <nav flex="~ gap-4" justify-center text-xl mb-6>
        <a v-for={i in routes.filter(i => i.meta?.title)} key={i.path} title="i.meta?.title" icon-btn flex="~ col items-center" onClick={() => router.push(i.path)}>
          <div class={i.meta?.icon} />
          <div text-sm>{ i.meta?.title }</div>
        </a>
      </nav>
    </>
  )
})
