export default defineComponent(() => {
  const router = useRouter()
  const route = useRoute('/hi/[name]')
  const user = useUserStore()

  watchEffect(() => {
    user.setNewName(route.params.name)
  })

  return (
    <div>
      <div text-4xl>
        <div i-carbon-pedestrian inline-block />
      </div>
      <p>
        { `Hi, ${user.savedName}!` }
      </p>

      <p text-sm opacity-75>
        <em>Demo of dynamic route</em>
      </p>

      <template v-if={user.otherNames.length}>
        <div mt-4 text-sm>
          <span opacity-75>Also known as:</span>
          <ul>
            <li v-for={otherName in user.otherNames} key="otherName">
              <button onClick={() => router.replace(`/hi/${otherName}`)}>
                { otherName }
              </button>
            </li>
          </ul>
        </div>
      </template>

      <div>
        <button
          m="3 t6"
          text-sm
          btn
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  )
})
