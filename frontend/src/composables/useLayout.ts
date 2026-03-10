import { ref, readonly } from 'vue'

const sidebarOpen = ref(true)

export function useLayout() {
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const openSidebar = () => {
    sidebarOpen.value = true
  }

  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  return {
    sidebarOpen: readonly(sidebarOpen),
    toggleSidebar,
    openSidebar,
    closeSidebar
  }
}