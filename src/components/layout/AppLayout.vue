<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import { useLayout } from '@/composables/useLayout'

const { sidebarOpen } = useLayout()
</script>

<template>
  <div class="min-h-screen relative bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Header -->
    <AppHeader />

    <!-- Contenido -->
    <main
      class="pt-16 transition-all duration-300"
      :class="sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'"
    >
      <div class="p-6">
        <RouterView />
      </div>
    </main>

  </div>
</template>