<script setup lang="ts">
import type { Player, Team } from '@/interfaces/Team';
import PlayersTable from './PlayersTable.vue';
import { getImageUrl } from '@/utils/getImage';
import { useRouter } from 'vue-router';

const props = defineProps<{
  forwards: Player[]
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
  <tr v-if="forwards.length === 0">
    <td colspan="6" class="px-6 py-10 text-center">
      <div class="flex flex-col items-center justify-center gap-3">
        <p class="text-slate-500 text-sm">
          Este equipo aún no tiene delanteros registrados.
        </p>
        <button
          @click="openAddPlayer(team)"
          class="bg-blue-800 hover:bg-blue-600/90 text-white px-6 py-2 rounded font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2"
        >
          <FaIcon icon="fa-user-plus"/>
          Añadir Delantero
        </button>
      </div>
    </td>
  </tr>
  <tr
    v-for="forward in forwards"
    :key="forward._id"
    class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
  >
    <!-- jugador -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <img
          class="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          :src="getImageUrl(forward.photo)"
          :alt="forward.fullName"
        />
        <div>
          <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {{ forward.fullName }}
          </p>
          <p class="text-xs text-slate-500">
            {{ forward.isStarter }}
          </p>
        </div>
      </div>
    </td>
    <!-- dorsal -->
    <td class="px-6 py-4 font-medium">
      {{ forward.number }}
    </td>
    <!-- edad -->
    <td class="hidden md:table-cell px-3 sm:px-6 py-3 text-center">
      {{ forward.age }}
    </td>
    <!-- municipio -->
    <td class="px-6 py-4">
      {{ forward.city }}
    </td>
    <!-- peso -->
    <td class="hidden md:table-cell px-3 sm:px-6 py-3 text-center">
      {{ forward.weight }}
    </td>
    <!-- altura -->
    <td class="hidden md:table-cell px-3 sm:px-6 py-3 text-center">
      {{ forward.height }}
    </td>
  </tr>  
</PlayersTable>
</template>

<style scoped>

</style>