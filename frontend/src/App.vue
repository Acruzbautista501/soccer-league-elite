<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { initFlowbite } from 'flowbite';

// Importante: Inicializa Flowbite aquí para que funcione en toda la app
onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <RouterView />
</template>

<style>
/* Borra todos los estilos anteriores y deja solo la importación de Tailwind */
@import '@/assets/main.css'; /* O donde tengas tus estilos globales con @tailwind base; */
</style>