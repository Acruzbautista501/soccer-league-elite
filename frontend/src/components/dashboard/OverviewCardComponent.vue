<script setup lang="ts">

</script>

<template>
  <section class="col-span-1 xl:col-span-2 bg-white dark:bg-gray-800 p-6 rounded shadow transition">
    <div class="flex justify-between items-start mb-6">
      <div>
        <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100">Estado de la Liga</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Temporada 2026</p>
      </div>
      <span class="inline-flex items-center px-2 py-1 ring-1 ring-inset ring-success-subtle text-fg-success-strong text-sm font-medium rounded bg-success-soft">
        Activa
      </span>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <p class="text-gray-500 text-xs uppercase font-bold mb-1">Total Equipos</p>
        <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">32</p>
      </div>
      <div class="p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <p class="text-gray-500 text-xs uppercase font-bold mb-1">Partidos Jugados</p>
        <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">148</p>
      </div>
      <div class="p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <p class="text-gray-500 text-xs uppercase font-bold mb-1">Goles Totales</p>
        <p class="text-3xl font-bold text-green-400">412</p>
      </div>
      <div class="p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <p class="text-gray-500 text-xs uppercase font-bold mb-1">Semanas Restantes</p>
        <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">4</p>
      </div>
    </div>
    <div class="mt-8 space-y-4">
      <div>
        <div class="flex justify-between text-sm mb-2">
          <span class="text-gray-800 dark:text-gray-100">Zona Golfo (16 Equipos)</span>
          <span class="text-gray-400">85% Completado</span>
        </div>
        <div class="w-full bg-gray-100 dark:bg-gray-900 h-2 rounded-full overflow-hidden">
          <div class="bg-green-400 h-full" style="width: 85%"></div>
        </div>
      </div>
      <div>
        <div class="flex justify-between text-sm mb-2">
          <span class="text-gray-800 dark:text-gray-100">Zona Norte (16 Equipos)</span>
          <span class="text-gray-400">72% Completado</span>
        </div>
        <div class="w-full bg-gray-100 dark:bg-gray-900 h-2 rounded-full overflow-hidden">
          <div class="bg-blue-500 h-full" style="width: 72%"></div>
        </div>
      </div>
    </div>        
  </section>
</template>

<style scoped>

</style>