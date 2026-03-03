<script setup lang="ts">
import nav from '@/navigation/nav'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const openDropdowns = ref<string[]>([])

const toggleDropdown = (name: string) => {
  openDropdowns.value = openDropdowns.value.includes(name)
    ? openDropdowns.value.filter(i => i !== name)
    : [...openDropdowns.value, name]
}

const isOpen = (name: string) => openDropdowns.value.includes(name)

const isActive = (path?: string) =>
  path && route.path.startsWith(path)

/* Auto-open cuando estás en un hijo */
watch(
  () => route.path,
  () => {
    nav.forEach(item => {
      if (item.children?.some(c => route.path.startsWith(c.to!))) {
        if (!openDropdowns.value.includes(item.name)) {
          openDropdowns.value.push(item.name)
        }
      }
    })
  },
  { immediate: true }
)
</script>

<template>
  <ul class="space-y-2 font-medium">

    <template
      v-for="item in nav"
      :key="`nav-${item.name}-${item.children ? 'group' : 'link'}`"
    >

      <!-- LINK SIMPLE -->
      <li v-if="!item.children">
        <RouterLink
          :to="item.to!"
          class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
          :class="isActive(item.to) ? 'bg-neutral-tertiary text-fg-brand' : ''"
        >
          <FaIcon
            v-if="item.icon"
            :icon="item.icon"
            class="w-5 h-5 transition duration-75 group-hover:text-fg-brand"
          />

          <span class="ms-3">{{ item.name }}</span>
        </RouterLink>
      </li>

      <!-- DROPDOWN -->
      <li v-else>
        <button
          type="button"
          @click.stop="toggleDropdown(item.name)"
          class="flex items-center w-full justify-between px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
        >
          <div class="flex items-center">
            <FaIcon
              v-if="item.icon"
              :icon="item.icon"
              class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
            />

            <span class="flex-1 ms-3 text-left whitespace-nowrap">
              {{ item.name }}
            </span>
          </div>

          <svg
            class="w-5 h-5 transition-transform duration-200"
            :class="isOpen(item.name) ? 'rotate-180' : ''"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path stroke="currentColor" stroke-width="2" d="m19 9-7 7-7-7"/>
          </svg>
        </button>

        <!-- SUBMENU -->
        <ul
          class="py-2 space-y-2"
          :class="isOpen(item.name) ? 'block' : 'hidden'"
        >
          <li
            v-for="child in item.children"
            :key="`child-${child.name}`"
          >
            <RouterLink
              :to="child.to!"
              class="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
              :class="isActive(child.to) ? 'bg-neutral-tertiary text-fg-brand' : ''"
            >
              <FaIcon
                v-if="child.icon"
                :icon="child.icon"
                class="w-4 h-4 me-3"
              />

              {{ child.name }}
            </RouterLink>
          </li>
        </ul>
      </li>

    </template>

  </ul>
</template>