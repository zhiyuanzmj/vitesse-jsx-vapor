import { acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore$('user', () => {
  /**
   * Current name of the user.
   */
  let savedName = $ref('')
  const previousNames = $ref(new Set<string>())

  const usedNames = $computed(() => Array.from(previousNames))
  const otherNames = $computed(() => usedNames.filter(name => name !== savedName))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName)
      previousNames.add(savedName)

    savedName = name
  }

  return {
    setNewName,
    otherNames,
    savedName,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
