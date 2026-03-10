// src/composables/useTheme.ts
import { ref } from 'vue'

const isDark = ref(document.documentElement.classList.contains('dark'))

export function useTheme() {
  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark')

    const dark = html.classList.contains('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')

    isDark.value = dark
  }

  return { isDark, toggleTheme }
}