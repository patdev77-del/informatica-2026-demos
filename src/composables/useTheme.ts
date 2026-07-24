import { computed } from 'vue'
import { useLocalStorage, usePreferredDark } from '@vueuse/core'

const stored = useLocalStorage('theme', null)
const prefersDark = usePreferredDark()

export function useTheme() {
  const theme = computed({
    get() {
      return stored.value ?? (prefersDark.value ? 'dark' : 'light')
    },
    set(v) {
      stored.value = v
      document.documentElement.setAttribute('data-theme', v)
    }
  })

  return { theme }
}
