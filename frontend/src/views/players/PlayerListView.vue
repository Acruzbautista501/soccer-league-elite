<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTeam } from '@/composables/useTeam'
import { useRoute, useRouter } from 'vue-router'
import { getImageUrl } from '@/utils/getImage'
import type { Player, Team } from '@/interfaces/Team'

// import TeamCard from '@/components/teams/TeamCard.vue'
// import AddTeamCard from '@/components/teams/AddTeamCard.vue'

// import { useTeam } from '@/composables/useTeam'
// import type { Team } from '@/interfaces/Team'

const { team, teamPlayer, getPlayersTeam} = useTeam()

// const MAX_TEAMS_PER_REGION = 16

const router = useRouter()
const route = useRoute()

const teamId = route.params.id as string
console.log(teamId)

// type RegionTab = 'Norte' | 'Golfo'
// const activeTab = ref<RegionTab>('Golfo')

onMounted(() => {
  getPlayersTeam(teamId)
})

// /* Equipos región Norte */
// const northTeams = computed(() =>
//   teams.value.filter(team => team.region === 'Zona Norte')
// )

// /* Equipos región Golfo */
// const gulfTeams = computed(() =>
//   teams.value.filter(team => team.region === 'Zona Golfo')
// )

// const northCount = computed(() => northTeams.value.length)
// const gulfCount = computed(() => gulfTeams.value.length)

// const isNorthFull = computed(() => northCount.value >= MAX_TEAMS_PER_REGION)
// const isGulfFull = computed(() => gulfCount.value >= MAX_TEAMS_PER_REGION)

// const openCreateTeam = (region: RegionTab) => {

//   if (region === 'Norte' && isNorthFull.value) {
//     alert('La Región Norte ya tiene el máximo de 16 equipos.')
//     return
//   }

//   if (region === 'Golfo' && isGulfFull.value) {
//     alert('La Región Golfo ya tiene el máximo de 16 equipos.')
//     return
//   }

//   router.push({
//     name: 'CrearEquipo'
//   })
// }

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

const openEditPlayer = (player: Player) => {
  router.push({
    name: 'EditarJugador',
    params: {
      name: player.fullName
    },
    query: {
      id: player._id
    }
  })
}

// const openSquadTeam = (team: Team) => {
//   router.push({
//     name: 'PlantillaEquipo',
//     params: {
//       id: team._id,
//     }
//   })
// }
</script>

<template>
  <div class="flex-1 p-6 md:p-10">
    <div class="w-full mx-auto flex flex-col gap-8">
      <section class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-slate-900 dark:text-slate-100 text-3xl font-black tracking-tight">Gestionar Jugadores</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Actualiza la información, dorsales y posiciones de tu equipo.</p>
        </div>
        <div class="flex flex-col lg:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
          <button
            @click="router.back()" 
            class="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-md font-medium border text-slate-600 dark:text-slate-400 border-slate-400 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <FaIcon icon="fa-circle-arrow-left" class="text-xl"/>
            Volver
          </button>
          <button
            @click="openAddPlayer(team)" 
            class="flex items-center gap-2 px-5 py-2.5 bg-blue-800/10 dark:bg-blue-500/10 text-blue-800 dark:text-blue-500 font-bold rounded hover:bg-blue-800/20 dark:hover:bg-blue-500/20 transition-colors"
          >
            <FaIcon icon="fa-user-plus"/>
            <span>Añadir Jugador</span>
          </button>
        </div>        
      </section>
      <section>
        <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table class="w-full text-left border-collapse text-slate-600 dark:text-slate-400">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th class="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Jugador</th>
                <th class="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Dorsal</th>
                <th class="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Posición</th>
                <th class="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Estado</th>
                <th class="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr 
                v-for="player in teamPlayer"
                :key="player._id"
                class="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <img
                      class="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      :src="getImageUrl(player.photo)"
                      :alt="player.fullName"
                    />
                    <div>
                      <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {{ player.fullName }}
                      </p>
                      <p class="text-xs text-slate-500">
                        {{ player.isStarter }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  {{ player.number }}
                </td>
                <td class="px-6 py-4">
                  {{ player.position }}
                </td>
                <td class="px-6 py-4">
                  <span class="bg-success-soft border border-success-subtle text-fg-success-strong text-xs font-medium px-1.5 py-0.5 rounded">
                    {{ player.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button
                      @click="openEditPlayer(player)" 
                      class="p-2 text-slate-400 hover:text-primary transition-colors"
                    >
                      <FaIcon icon="fa-pencil" />
                    </button>
                    <button class="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <FaIcon icon="fa-trash-can" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>

</style>