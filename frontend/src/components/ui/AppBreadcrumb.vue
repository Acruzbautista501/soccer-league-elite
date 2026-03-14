<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

type BreadcrumbLabel = string | ((route: RouteLocationNormalizedLoaded) => string)

interface BreadcrumbMeta {
  label: BreadcrumbLabel
  to?: string
}

const route = useRoute()

const items = computed(() => {
  const meta = (route.meta.breadcrumbs ?? []) as BreadcrumbMeta[]
  return meta.map((item) => ({
    label: typeof item.label === 'function' ? item.label(route) : item.label,
    to: item.to,
  }))
})
</script>

<template>
  <nav class="flex mb-4" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <!-- Home -->
      <li class="inline-flex items-center">
        <RouterLink
          to="/dashboard"
          class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
        >
          <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
          </svg>
          Inicio
        </RouterLink>
      </li>

      <!-- Dynamic items -->
      <li
        v-for="(item, index) in items"
        :key="index"
        :aria-current="index === items.length - 1 ? 'page' : undefined"
      >
        <div class="flex items-center space-x-1.5">
          <svg class="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
          </svg>
          <RouterLink
            v-if="item.to"
            :to="item.to"
            class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
          >
            {{ item.label }}
          </RouterLink>
          <span
            v-else
            class="inline-flex items-center text-sm font-medium text-body-subtle"
          >
            {{ item.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>
