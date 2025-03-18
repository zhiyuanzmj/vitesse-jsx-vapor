export default defineComponent(() => {
  const router = useRouter()

  return () => (
    <main p="x4 y10" text="center teal-700 dark:gray-200">
      <div text-4xl>
        <div i-carbon-warning inline-block />
      </div>
      <RouterView />
      <div>
        <button text-sm btn m="3 t8" onClick={() => router.back()}>
          Back
        </button>
      </div>
    </main>
  )
})
