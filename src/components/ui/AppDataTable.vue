<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  columns: string[]
  rows: (string | number)[][]
}

const props = defineProps<Props>()

// Estados para búsqueda y paginación
const searchQuery = ref('')
const perPage = ref(5)
const currentPage = ref(1)
const isDropdownOpen = ref(false)

// Lógica de Filtrado
const filteredRows = computed(() => {
  if (!searchQuery.value) return props.rows
  
  const query = searchQuery.value.toLowerCase()
  return props.rows.filter(row => 
    row.some(cell => String(cell).toLowerCase().includes(query))
  )
})

// Lógica de Paginación
const totalPages = computed(() => Math.ceil(filteredRows.value.length / perPage.value))
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredRows.value.slice(start, end)
})

const changePerPage = (value: number) => {
  perPage.value = value
  currentPage.value = 1
  isDropdownOpen.value = false
}
</script>

<template>
  <div class="p-6">
    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default dark:border-gray-700">
      
      <div class="p-4 flex items-center justify-between space-x-4">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            class="block w-full max-w-96 ps-9 pe-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" 
            placeholder="Buscar en la tabla..."
          >
        </div>

        <div class="relative">
          <button 
            @click="isDropdownOpen = !isDropdownOpen"
            class="shrink-0 inline-flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-base text-sm px-3 py-2 focus:outline-none transition" 
            type="button"
          >
            Mostrar: {{ perPage }}
            <svg class="w-4 h-4 ms-2" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
            </svg>
          </button>
          
          <div v-if="isDropdownOpen" class="absolute right-0 z-10 mt-2 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-32">
            <ul class="p-2 text-sm text-body font-medium">
              <li v-for="n in [5, 10, 25, 50, 100]" :key="n">
                <button 
                  @click="changePerPage(n)" 
                  class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded text-left"
                >
                  {{ n }} partidos
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <table class="w-full text-sm text-left text-body">
        <thead class="text-sm text-body bg-neutral-secondary-medium dark:bg-gray-800/90 border-b border-t border-default-medium">
          <tr>
            <th v-for="col in columns" :key="col" scope="col" class="px-6 py-3 font-medium">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, i) in paginatedRows" 
            :key="i"
            class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium transition-colors"
          >
            <td 
              v-for="(cell, j) in row" 
              :key="j"
              class="px-6 py-4 whitespace-nowrap"
              :class="{ 'font-medium text-heading': j === 0 }"
            >
              {{ cell }}
            </td>
          </tr>
          <tr v-if="paginatedRows.length === 0">
            <td :colspan="columns.length" class="px-6 py-10 text-center text-body opacity-60">
              No se encontraron resultados para "{{ searchQuery }}"
            </td>
          </tr>
        </tbody>
      </table>

      <nav class="flex items-center justify-between p-4 border-t border-default" aria-label="Table navigation">
        <span class="text-sm font-normal text-body">
          Mostrando <span class="font-semibold text-heading">{{ paginatedRows.length > 0 ? (currentPage - 1) * perPage + 1 : 0 }} a {{ Math.min(currentPage * perPage, filteredRows.length) }}</span> de <span class="font-semibold text-heading">{{ filteredRows.length }}</span> partidos
        </span>
        <ul class="flex -space-x-px text-sm">
          <li>
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium disabled:opacity-50 rounded-s-base px-3 h-9"
            >
              Anterior
            </button>
          </li>
          <li>
            <button 
              class="flex items-center justify-center text-fg-brand bg-brand-softer border border-default-medium w-9 h-9"
            >
              {{ currentPage }}
            </button>
          </li>
          <li>
            <button 
              @click="currentPage++" 
              :disabled="currentPage >= totalPages"
              class="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium disabled:opacity-50 rounded-e-base px-3 h-9"
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>