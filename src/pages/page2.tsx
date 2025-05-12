export default defineComponent(() => {
  const route = useRoute()
  return (
    <div>
      {route.meta.title}
    </div>
  )
})

definePage({
  meta: {
    title: 'Page 2',
    icon: 'i-carbon:page-number',
  },
})
