<script setup lang="ts">

</script>

<template>
  <section class="bg-white dark:bg-gray-800 p-6 rounded shadow transition overflow-hidden">
    <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Accciones Rápidas</h2>
    <div class="space-y-3">
      <button class="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 rounded transition-all group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
            <FaIcon 
              icon="file-circle-plus"
            />
          </div>
          <div class="text-left">
            <p class="font-bold text-sm text-gray-800 dark:text-gray-100">Nuevo Resultado</p>
            <p class="text-xs text-gray-500">Agrega el resultado de un partido</p>
          </div>
        </div>
        <FaIcon 
          icon="plus"
          class="text-gray-300 dark:text-gray-700"
        />
      </button>
      <button class="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 rounded transition-all group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
            <FaIcon 
              icon="fa-pen-to-square"
            />
          </div>
          <div class="text-left">
            <p class="font-bold text-sm text-gray-800 dark:text-gray-100">Editar Equipo</p>
            <p class="text-xs text-gray-500">Modifica la información de tu plantilla</p>
          </div>
        </div>
        <FaIcon 
          icon="plus"
          class="text-gray-300 dark:text-gray-700"
        />
      </button>
      <button class="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 rounded transition-all group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
            <FaIcon 
              icon="fa-calendar-days"
            />
          </div>
          <div class="text-left">
            <p class="font-bold text-sm text-gray-800 dark:text-gray-100">Calendario</p>
            <p class="text-xs text-gray-500">Agrega o reprograma jornadas</p>
          </div>
        </div>
        <FaIcon 
          icon="plus"
          class="text-gray-300 dark:text-gray-700"
        />
      </button>      
    </div>
  </section>
</template>

<style scoped>

</style>