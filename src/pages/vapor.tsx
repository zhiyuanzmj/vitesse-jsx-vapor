export default defineVaporComponent(() => {
  const route = useRoute()
  return (
    <div>
      {route.meta.title}
    </div>
  )
})

definePage({
  meta: {
    title: 'Vapor DOM',
    icon: 'i-carbon:logo-vue',
  },
})
