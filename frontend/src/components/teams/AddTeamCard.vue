<script setup lang="ts">
defineProps<{
  region: 'Norte' | 'Golfo'
}>()

const emit = defineEmits<{
  (e: 'create', region: 'Norte' | 'Golfo'): void
}>()
</script>

<template>
  <div
    @click="emit('create', region)"
    class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:border-blue-800/50 hover:bg-blue-500/5 cursor-pointer transition-all group mt-8"
  >
    <div class="size-12 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary mb-3">
      <FaIcon icon="plus" class="text-2xl"/>
    </div>

    <p class="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-primary">
      Registrar Equipo
    </p>

    <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
      Completa la Región {{ region }}
    </p>
  </div>
</template>