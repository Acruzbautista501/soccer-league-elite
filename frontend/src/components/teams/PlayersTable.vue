<script setup lang="ts"></script>

<template>
  <div class="relative overflow-x-auto bg-white dark:bg-slate-900 shadow-sm rounded-xl border border-slate-200 dark:border-slate-800">

    <table class="w-full min-w-[500px] sm:min-w-[650px] text-sm text-left text-slate-600 dark:text-slate-400">

      <thead class="text-xs uppercase bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
        <tr>
          <th class="px-3 sm:px-6 py-3">Jugador</th>
          <th class="px-3 sm:px-6 py-3">Dorsal</th>
          <th class="px-3 sm:px-6 py-3">Edad</th>
          <th class="px-3 sm:px-6 py-3">Municipio</th>
          <th class="px-3 sm:px-6 py-3 text-center">Peso (kg)</th>
          <th class="px-3 sm:px-6 py-3 text-center">Altura (m)</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
        <slot />
      </tbody>

    </table>

  </div>
</template>