<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed } from 'vue'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DataTableColumn {
  key: string
  label: string
  sortable?: boolean
  numeric?: boolean     // ordena como número en vez de string
  align?: 'left' | 'right'
}

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<{
  data: T[]
  columns: DataTableColumn[]
  searchPlaceholder?: string
  searchFields?: string[]     // campos del objeto donde se busca
  emptyMessage?: string
  itemLabel?: string          // "jugadores", "equipos", etc.
}>(), {
  searchPlaceholder: 'Buscar...',
  searchFields: () => [],
  emptyMessage: 'No se encontraron registros.',
  itemLabel: 'registros',
})

// ─── Search ───────────────────────────────────────────────────────────────────

const searchQuery = ref('')

function onSearch() {
  currentPage.value = 1
}

// ─── Pagination ───────────────────────────────────────────────────────────────

const itemsPerPage = ref(10)
const currentPage = ref(1)
const pageSizeOptions = [5, 10, 25, 50, 100]

function onPageSizeChange() {
  currentPage.value = 1
}

// ─── Sorting ──────────────────────────────────────────────────────────────────

const sortKey = ref<string>('')
const sortDir = ref<'asc' | 'desc'>('asc')

function toggleSort(col: DataTableColumn) {
  if (!col.sortable) return
  if (sortKey.value === col.key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = col.key
    sortDir.value = 'asc'
  }
  currentPage.value = 1
}

// ─── Computed data ────────────────────────────────────────────────────────────

const processedData = computed<T[]>(() => {
  const q = searchQuery.value.toLowerCase().trim()

  const fields = props.searchFields.length
    ? props.searchFields
    : props.columns.map(c => c.key)

  const list: T[] = q
    ? props.data.filter(item =>
        fields.some(f => String(item[f] ?? '').toLowerCase().includes(q))
      )
    : [...props.data]

  if (sortKey.value) {
    const col = props.columns.find(c => c.key === sortKey.value)
    list.sort((a, b) => {
      const valA = a[sortKey.value] ?? ''
      const valB = b[sortKey.value] ?? ''
      if (col?.numeric) {
        return sortDir.value === 'asc'
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA)
      }
      return sortDir.value === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA))
    })
  }

  return list
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(processedData.value.length / itemsPerPage.value))
)

const paginatedData = computed<T[]>(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return processedData.value.slice(start, start + itemsPerPage.value)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | '...')[] = []

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }

  return pages
})

const showingFrom = computed(() =>
  processedData.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1
)

const showingTo = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, processedData.value.length)
)

function goToPage(page: number | '...') {
  if (typeof page === 'number') currentPage.value = page
}
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">

    <!-- ── Toolbar ─────────────────────────────────────────────────────────── -->
    <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-b border-slate-100 dark:border-slate-800">
      <!-- Search -->
      <div class="w-full md:w-1/2">
        <form class="flex items-center" @submit.prevent>
          <label for="dt-search" class="sr-only">Buscar</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              id="dt-search"
              v-model="searchQuery"
              @input="onSearch"
              type="text"
              :placeholder="searchPlaceholder"
              class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 p-2 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
            />
          </div>
        </form>
      </div>

      <!-- Right: acciones extra + selector de página -->
      <div class="flex items-center gap-3 shrink-0">
        <!-- Slot para botones custom (filtros, exportar, etc.) -->
        <slot name="toolbar-actions" />

        <!-- Page size -->
        <div class="flex items-center gap-2">
          <label for="dt-page-size" class="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">Mostrar:</label>
          <select
            id="dt-page-size"
            v-model="itemsPerPage"
            @change="onPageSizeChange"
            class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-1.5 transition-colors w-[55px]"
          >
            <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- ── Table ───────────────────────────────────────────────────────────── -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-slate-600 dark:text-slate-400">
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <th
              v-for="col in columns"
              :key="col.key"
              :class="[
                'px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider transition-colors',
                col.sortable ? 'cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-300' : '',
                col.align === 'right' ? 'text-right' : '',
              ]"
              @click="toggleSort(col)"
            >
              <span :class="['flex items-center gap-1', col.align === 'right' ? 'justify-end' : '']">
                {{ col.label }}
                <svg
                  v-if="col.sortable"
                  class="w-3 h-3 shrink-0"
                  :class="sortKey === col.key ? 'text-blue-500' : 'text-slate-300 dark:text-slate-600'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    v-if="sortKey === col.key && sortDir === 'asc'"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414 6.707 9.707a1 1 0 01-1.414 0z"
                  />
                  <path
                    v-else-if="sortKey === col.key && sortDir === 'desc'"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z"
                  />
                  <path
                    v-else
                    d="M5 12l5-5 5 5H5z M5 8l5 5 5-5H5z"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <!-- Empty state -->
          <tr v-if="paginatedData.length === 0">
            <td
              :colspan="columns.length"
              class="px-6 py-10 text-center text-slate-400 dark:text-slate-500 text-sm"
            >
              <slot name="empty">{{ emptyMessage }}</slot>
            </td>
          </tr>

          <!--
            Slot "body": expone los items paginados al padre.
            Uso:
              <template #body="{ items }">
                <tr v-for="item in items" :key="item._id"> ... </tr>
              </template>
          -->
          <slot name="body" :items="paginatedData" />
        </tbody>
      </table>
    </div>

    <!-- ── Pagination ──────────────────────────────────────────────────────── -->
    <nav
      class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 border-t border-slate-100 dark:border-slate-800"
      aria-label="Navegación de tabla"
    >
      <span class="text-sm font-normal text-slate-500 dark:text-slate-400">
        Mostrando
        <span class="font-semibold text-slate-800 dark:text-slate-200">{{ showingFrom }} a {{ showingTo }}</span>
        de
        <span class="font-semibold text-slate-800 dark:text-slate-200">{{ processedData.length }}</span>
        {{ itemLabel }}
      </span>

      <ul class="inline-flex items-stretch -space-x-px">
        <!-- Prev -->
        <li>
          <button
            @click="currentPage > 1 && currentPage--"
            :disabled="currentPage === 1"
            class="flex items-center justify-center h-full py-1.5 px-3 text-slate-500 bg-white dark:bg-slate-900 rounded-l-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span class="sr-only">Anterior</span>
            <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </li>

        <!-- Page numbers -->
        <li v-for="(page, i) in visiblePages" :key="i">
          <button
            @click="goToPage(page)"
            :disabled="page === '...'"
            :class="[
              'flex items-center justify-center text-sm py-2 px-3 leading-tight border transition-colors',
              page === currentPage
                ? 'z-10 text-blue-600 bg-blue-50 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400'
                : 'text-slate-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white',
              page === '...' ? 'cursor-default' : '',
            ]"
          >
            {{ page }}
          </button>
        </li>

        <!-- Next -->
        <li>
          <button
            @click="currentPage < totalPages && currentPage++"
            :disabled="currentPage === totalPages"
            class="flex items-center justify-center h-full py-1.5 px-3 text-slate-500 bg-white dark:bg-slate-900 rounded-r-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span class="sr-only">Siguiente</span>
            <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>

  </div>
</template>
