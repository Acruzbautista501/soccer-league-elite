<script setup lang="ts">
import { useLayout } from '@/composables/useLayout'
import { useTheme } from '@/composables/useTheme'

const { toggleSidebar } = useLayout()
const { isDark, toggleTheme } = useTheme()
</script>
<template>
  <nav class="fixed top-0 z-50 w-full bg-neutral-primary-soft dark:bg-gray-800 border-b border-default dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">

          <!-- 🔥 Antes era data-drawer-toggle -->
          <button
            @click="toggleSidebar"
            type="button"
            class="text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none"
          >
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>
            </svg>
          </button>

          <a href="#" class="flex ms-2 md:me-24">
            <img
              :src="isDark ? '/img/logo-liga-dark.png' : '/img/logo-liga.png'"
              class="h-12 me-3 transition-all duration-300"
              alt="Liga Logo"
            />
          </a>
        </div>

        <!-- User + Theme -->
        <div class="flex items-center gap-3">

          <!-- Toggle Dark Mode -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <!-- Moon -->
            <FaIcon
              v-if="!isDark"
              icon="moon"
              class="w-5 h-5"
            />

            <!-- Sun -->
            <FaIcon
              v-else
              icon="sun"
              class="w-5 h-5"
            />
          </button>

          <img
            class="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
        </div>

      </div>
    </div>
  </nav>
</template>