export default defineComponent(() => {
  const route = useRoute()
  return () => (
    <div>
      {route.meta.title}
    </div>
  )
})

definePage({
  meta: {
    title: 'Virtual DOM',
    icon: 'i-carbon:page-number',
  },
})
