<script setup lang="ts">
import type { Player, Team } from '@/interfaces/Team'
import PlayersTable from './PlayersTable.vue'
import { getImagePlayerUrl } from '@/utils/getImage'
import { useRouter } from 'vue-router';

const props = defineProps<{
  goalKeepers: Player[]
  team: Team
}>()

const router = useRouter()

const openAddPlayer = (team: Team) => {
  router.push({
    name: 'AgregarJugador',
    params: {
      name: team.name
    },
    query: {
      id: team._id
    }
  })
}
</script>

<template>
  <PlayersTable>
    <tr v-if="goalKeepers.length === 0">
      <td colspan="6" class="px-6 py-10 text-center">

        <div class="flex flex-col items-center justify-center gap-3">
          <p class="text-slate-500 text-sm">
            Este equipo aún no tiene porteros registrados.
          </p>

          <button
            @click="openAddPlayer(team)"
            class="bg-blue-800 hover:bg-blue-600/90 text-white px-6 py-2 rounded font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            <FaIcon icon="fa-user-plus"/>
            Añadir Portero
          </button>
        </div>

      </td>
      <td class="hidden md:table-cell px-3 sm:px-6 py-3 text-center"></td>
    </tr>    
    <tr
      v-for="goalKeeper in goalKeepers"
      :key="goalKeeper._id"
      class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
    >
      <!-- jugador -->
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <img
            class="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            :src="getImagePlayerUrl(goalKeeper.photo)"
            :alt="goalKeeper.fullName"
          />
          <div>
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {{ goalKeeper.fullName }}
            </p>
            <p class="text-xs text-slate-500">
              {{ goalKeeper.isStarter }}
            </p>
          </div>
        </div>
      </td>
      <!-- dorsal -->
      <td class="px-6 py-4 font-medium">
        {{ goalKeeper.number }}
      </td>
      <!-- edad -->
      <td class="hidden md:table-cell px-3 sm:px-6 py-3 text-center">
        {{ goalKeeper.age }}
      </td>
      <!-- municipio -->
      <td class="px-6 py-4">
        {{ goalKeeper.city }}
      </td>
      <!-- peso -->
      <td class="hidden md:table-cell px-3 sm:px-6 py-3 text-center">
        {{ goalKeeper.weight }}
      </td>
      <!-- altura -->
      <td class="hidden md:table-cell px-3 sm:px-6 py-3 text-center">
        {{ goalKeeper.height }}
      </td>
    </tr>
  </PlayersTable>
</template>