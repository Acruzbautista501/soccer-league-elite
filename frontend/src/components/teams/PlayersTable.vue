<script setup lang="ts">
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
    <table class="w-full text-left border-collapse">

      <thead>
        <tr class="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <th class="px-6 py-4 w-[35%]">Jugador</th>
          <th class="px-6 py-4 w-[10%]">Dorsal</th>
          <th class="px-6 py-4 w-[10%]">Edad</th>
          <th class="px-6 py-4 w-[20%]">Municipio</th>
          <th class="px-6 py-4 text-center w-[12%]">Peso (kg)</th>
          <th class="px-6 py-4 text-center w-[13%]">Altura (m)</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
        <slot />
      </tbody>

    </table>
  </div>
</template>