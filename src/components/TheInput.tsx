import type { InputHTMLAttributes } from 'vue'

export default defineVaporComponent((_: InputHTMLAttributes) => {
  const modelValue = defineModel<string>()

  return (
    <input
      id="input"
      v-model={modelValue.value}
      type="text"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    />
  )
})
