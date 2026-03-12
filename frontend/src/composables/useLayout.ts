import { ref, readonly, onMounted, onUnmounted } from 'vue'

const sidebarOpen = ref(true)

export function useLayout() {

  const checkScreen = () => {
    if (window.innerWidth <= 1024) {
      sidebarOpen.value = false
    } else {
      sidebarOpen.value = true
    }
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const openSidebar = () => {
    sidebarOpen.value = true
  }

  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  onMounted(() => {
    checkScreen()
    window.addEventListener('resize', checkScreen)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreen)
  })

  return {
    sidebarOpen: readonly(sidebarOpen),
    toggleSidebar,
    openSidebar,
    closeSidebar
  }
}