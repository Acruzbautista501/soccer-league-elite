<script setup lang="ts">
import type { Player } from '@/interfaces/Team';
import PlayersTable from './PlayersTable.vue';
import { getImageUrl } from '@/utils/getImage';
const props = defineProps<{
  defenders: Player[]
}>()

</script>

<template>
  <PlayersTable>
    <tr v-if="defenders.length === 0">
      <td colspan="6" class="px-6 py-10 text-center">

        <div class="flex flex-col items-center justify-center gap-3">
          <p class="text-slate-500 text-sm">
            Este equipo aún no tiene defensas registrados.
          </p>

          <button
            class="bg-blue-800 hover:bg-blue-600/90 text-white px-6 py-2 rounded font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            <FaIcon icon="fa-user-plus"/>
            Añadir Defensa
          </button>
        </div>

      </td>
    </tr>     
    <tr
      v-for="defender in defenders"
      :key="defender._id"
      class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
    >
      <!-- jugador -->
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <img
            class="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            :src="getImageUrl(defender.photo)"
            :alt="defender.fullName"
          />
          <div>
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {{ defender.fullName }}
            </p>
            <p class="text-xs text-slate-500">
              {{ defender.isStarter }}
            </p>
          </div>
        </div>
      </td>
      <!-- dorsal -->
      <td class="px-6 py-4 font-medium">
        {{ defender.number }}
      </td>
      <!-- edad -->
      <td class="px-6 py-4">
        {{ defender.age }}
      </td>
      <!-- municipio -->
      <td class="px-6 py-4">
        {{ defender.city }}
      </td>
      <!-- peso -->
      <td class="px-6 py-4 text-center">
        {{ defender.weight }}
      </td>
      <!-- altura -->
      <td class="px-6 py-4 text-center">
        {{ defender.height }}
      </td>
    </tr>
  </PlayersTable>
</template>

<style scoped>

</style>