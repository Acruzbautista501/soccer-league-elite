<script setup lang="ts">

</script>

<template>
  <div class="flex-1 p-6 md:p-10">
    <div class="max-w-9xl mx-auto flex flex-col gap-8">
      <section class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-slate-900 dark:text-slate-100 text-3xl font-black tracking-tight">Registrar Nuevo Equipo</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Completa el formulario para registrar un equipo en la temporada actual.</p>
        </div>
        <!-- <div class="flex gap-4">
          <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
            <div class="bg-primary/20 text-primary p-1.5 rounded-lg"><span class="material-symbols-outlined text-sm">north</span></div>
            <div>
              <p class="text-2xs text-slate-400 uppercase font-bold">Norte</p>
              <p class="text-sm font-bold text-slate-800 dark:text-slate-100">16/16 Equipos</p>
            </div>
          </div>
          <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
            <div class="bg-primary/20 text-primary p-1.5 rounded-lg"><span class="material-symbols-outlined text-sm">south</span></div>
            <div>
              <p class="text-2xs text-slate-400 uppercase font-bold">Sur</p>
              <p class="text-sm font-bold text-slate-800 dark:text-slate-100">16/16 Equipos</p>
            </div>
          </div>
        </div> -->
      </section>
<form class="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
<!-- Section: Informacion General -->
<div>
<div class="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
<span class="material-symbols-outlined text-primary">info</span>
<h3 class="text-lg font-bold">Información General</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="col-span-1 md:col-span-2 flex flex-col gap-2">
<label class="text-sm font-semibold">Nombre del Equipo</label>
<input class="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary" placeholder="Ej: Los Galácticos FC" type="text"/>
</div>
<div class="flex flex-col gap-2">
<label class="text-sm font-semibold">Ciudad</label>
<input class="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary" placeholder="Ej: Madrid" type="text"/>
</div>
<div class="flex flex-col gap-2">
<label class="text-sm font-semibold">Región</label>
<select class="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary">
<option disabled="" selected="" value="">Selecciona una región</option>
<option value="norte">Zona Norte</option>
<option value="sur">Zona Sur</option>
</select>
</div>
<div class="flex flex-col gap-2">
<label class="text-sm font-semibold">Color Principal</label>
<div class="flex items-center gap-3">
<input class="h-10 w-16 p-1 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 bg-transparent" type="color" value="#ec5b13"/>
<span class="text-xs text-slate-500">Identificador visual del equipo</span>
</div>
</div>
<div class="flex flex-col gap-2">
<label class="text-sm font-semibold">Escudo del Equipo</label>
<div class="flex items-center justify-center w-full">
<label class="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-800 hover:bg-slate-100 dark:border-slate-700 transition-all">
<div class="flex flex-col items-center justify-center pt-5 pb-6">
<span class="material-symbols-outlined text-slate-400 mb-2">cloud_upload</span>
<p class="text-xs text-slate-500 dark:text-slate-400">PNG, JPG o SVG (Máx. 2MB)</p>
</div>
<input class="hidden" type="file"/>
</label>
</div>
</div>
</div>
</div>
<!-- Section: Personal Técnico -->
<div>
<div class="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
<span class="material-symbols-outlined text-primary">person_check</span>
<h3 class="text-lg font-bold">Responsable del Equipo</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="flex flex-col gap-2">
<label class="text-sm font-semibold">Entrenador Principal</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">person</span>
<input class="w-full pl-10 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary" placeholder="Nombre completo" type="text"/>
</div>
</div>
<div class="flex flex-col gap-2">
<label class="text-sm font-semibold">Email de Contacto</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">mail</span>
<input class="w-full pl-10 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary" placeholder="correo@ejemplo.com" type="email"/>
</div>
</div>
<div class="flex flex-col gap-2 col-span-1 md:col-span-2">
<label class="text-sm font-semibold">Asignar Delegado</label>
<select class="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary">
<option value="">Sin asignar (Opcional)</option>
<option value="1">Juan Pérez</option>
<option value="2">Marta Gómez</option>
<option value="3">Roberto Carlos</option>
</select>
<p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-1">El delegado gestionará las actas de los partidos.</p>
</div>
</div>
</div>
<!-- Action Buttons -->
<div class="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
<button class="px-6 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" type="button">
                                Cancelar
                            </button>
<button class="px-8 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-2" type="submit">
<span class="material-symbols-outlined text-lg">save</span>
                                Registrar Equipo
                            </button>
</div>
</form>
<!-- Help Card -->
<div class="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-4 items-start">
<span class="material-symbols-outlined text-primary">lightbulb</span>
<div>
<h4 class="text-sm font-bold text-primary">Consejo Profesional</h4>
<p class="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                Asegúrate de que el escudo tenga una buena resolución para que se vea correctamente en las tablas de clasificación y perfiles de partido. Se recomienda un formato cuadrado.
                            </p>
</div>
</div>
    </div>
  </div>
</template>

<style scoped>

</style>