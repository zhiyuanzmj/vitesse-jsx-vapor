export default defineVaporComponent(() => {
  const user = useUserStore()
  let name = $ref(user.savedName)

  const router = useRouter()
  function go() {
    if (name)
      router.push(`/hi/${encodeURIComponent(name)}`)
  }

  return (
    <div>
      <div text-4xl>
        <div i-carbon-campsite inline-block />
      </div>
      <p>
        <a rel="noreferrer" href="https://github.com/zhiyuanzmj/vitesse-jsx-vapor" target="_blank">
          Vitesse JSX Vapor
        </a>
      </p>
      <p>
        <em text-sm opacity-75>Opinionated Vite Starter Template</em>
      </p>

      <div py-4 />

      <TheInput
        v-model={name}
        placeholder="What's your name?"
        autocomplete="false"
        onKeydown_enter={go}
      />

      <label class="hidden" for="input">What's your name?</label>

      <div>
        <button
          m-3
          text-sm
          btn
          disabled={!name}
          onClick={go}
        >
          Go
        </button>
      </div>
    </div>
  )
})

definePage({
  meta: {
    layout: 'home',
  },
})
