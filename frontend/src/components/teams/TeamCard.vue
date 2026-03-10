<script setup lang="ts">
import type { Team } from '@/interfaces/Team'
import { getImageUrl } from '@/utils/getImage'

const props = defineProps<{
  team: Team
}>()

const emit = defineEmits<{
  (e: 'view-roster', team: Team): void
  (e: 'edit', team: Team): void
}>()

const handleViewRoster = () => emit('view-roster', props.team)
const handleEdit = () => emit('edit', props.team)
</script>

<template>
  <div
    class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
           rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group relative mt-8"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <!-- Escudo -->
      <div
        class="size-14 rounded-lg bg-slate-100 dark:bg-slate-900
               flex items-center justify-center p-2 overflow-hidden"
      >
        <img
          v-if="team.logoUrl"
          :src="getImageUrl(team.logoUrl)"
          alt="Escudo"
          class="w-full h-full object-contain"
        />
        <span v-else class="text-xs text-slate-400">Sin logo</span>
      </div>

      <!-- Estado -->
      <div
        :class="[
          'text-2xs font-bold px-2 py-1 rounded-full uppercase',
          team.status
            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
        ]"
      >
        {{ team.status ? 'Activo' : 'Suspendido' }}
      </div>
    </div>

    <!-- Info -->
    <div>
      <h3 class="text-slate-900 dark:text-slate-100 font-bold text-lg">
        {{ team.name }}
      </h3>

      <p
        class="text-slate-500 dark:text-slate-400 text-sm mt-0.5
               flex items-center gap-1"
      >
        <FaIcon icon="fa-location-dot"/>
        {{ team.city }}
      </p>

      <p class="text-sm text-slate-400 mt-1">
        Entrenador: {{ team.coach }}
      </p>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex gap-2">
      <button
        @click="handleViewRoster"
        class="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200
               dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-bold py-2 rounded
               transition-colors flex items-center justify-center gap-1"
      >
        <FaIcon icon="fa-people-group"/>
        Ver Plantilla
      </button>

      <button
        @click="handleEdit"
        class="size-9 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200
               dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300
               rounded flex items-center justify-center transition-colors"
      >
        <FaIcon icon="fa-pen-to-square"/>
      </button>
    </div>
  </div>
</template>