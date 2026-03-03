<script setup lang="ts">
import { useLayout } from '@/composables/useLayout'
import AppSidebarNav from '@/components/layout/AppSidebarNav.vue'

const { sidebarOpen, closeSidebar } = useLayout()
</script>

<template>
  <!-- Overlay móvil -->
  <div
    v-if="sidebarOpen"
    class="fixed inset-0 z-30 bg-black/50 lg:hidden"
    @click="closeSidebar"
  />

  <!-- Sidebar -->
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform my-5"
    :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-full px-3 py-5 overflow-y-auto bg-neutral-primary-soft dark:bg-gray-800 border-e border-default dark:border-gray-700">
      <!-- Logo -->
      <div class="flex items-center ps-2.5 mb-5">
        <img src="/img/logo-liga.png" class="h-6 me-3" />
      </div>
      <!-- NAV -->
      <AppSidebarNav />

    </div>
  </aside>
</template>