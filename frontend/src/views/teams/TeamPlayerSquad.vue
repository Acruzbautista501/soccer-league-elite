<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getImageUrl } from '@/utils/getImage'
import { useTeam } from '@/composables/useTeam';
import { computed, onMounted } from 'vue';
import GoalKeeperTable from '@/components/teams/GoalKeeperTable.vue';
import DefendersTable from '@/components/teams/DefendersTable.vue';
import MidfieldersTable from '@/components/teams/MidfieldersTable.vue';
import ForwardsTable from '@/components/teams/ForwardsTable.vue';
import type { Team } from '@/interfaces/Team';

const route = useRoute()
const router = useRouter()

const { team, teamPlayer, getPlayersTeam} = useTeam()

const teamId = route.params.id as string

const goalKeepers = computed(() =>
  teamPlayer.value.filter(player => player.position === 'Portero')
)

const defenders = computed(() =>
  teamPlayer.value.filter(player => player.position === 'Defensa')
)

const midFielders = computed(() =>
  teamPlayer.value.filter(player => player.position === 'Mediocampista')
)

const forwards = computed(() =>
  teamPlayer.value.filter(player => player.position === 'Delantero')
)

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

const openEditSquadPlayer = (team: Team) => {
  router.push({
    name: 'EditarPlantilla',
    params: {
      id: team._id
    }
  })
}

onMounted( async () => {
  await getPlayersTeam(teamId)
})

</script>
<template>
  <div class="flex-1 p-3 sm:p-5 md:p-10">
    <div class="w-full mx-auto flex flex-col gap-8">
      <section
        class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-50 dark:bg-slate-800 rounded-xl p-2 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
            <img
              alt="Escudo Equipo"
              class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
              :src="getImageUrl(team.logoUrl)"
            />
          </div>

          <div>
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
              {{ team.name }}
            </h2>

            <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
              <FaIcon icon="fa-location-dot"/>
              {{ team.city }}
            </div>
          </div>
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
            v-if="teamPlayer.length > 0" 
            @click="openEditSquadPlayer(team)"
            class="bg-blue-800 hover:bg-blue-600/90 text-white px-4 py-2 rounded font-bold text-md shadow-sm w-full sm:w-auto flex items-center justify-center gap-2 transition-all"
            >
            <FaIcon icon="fa-pen-to-square" class="text-white text-xl"/>
            Editar Plantilla
          </button>
        </div>     
      </section>
      <section v-if="teamPlayer.length === 0" class="flex flex-col items-center justify-center py-16">
        <p class="text-slate-500 mb-4">
          Este equipo aún no tiene jugadores registrados.
        </p>
        <div class="w-72">
          <div
            @click="openAddPlayer(team)"
            class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:border-blue-800/50 hover:bg-blue-500/5 cursor-pointer transition-all group mt-8">
            <div class="size-12 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary mb-3">
              <FaIcon icon="plus" class="text-2xl"/>
            </div>
            <p class="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-primary">
              Añadir Jugador
            </p>
            <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Agrega un jugador a la plantilla
            </p>
          </div>
        </div>
      </section>       
      <section v-else class="grid gap-6"> 
        <!-- PORTEROS -->     
        <div class="flex items-center gap-2 mb-1 mt-3">
          <span class="w-1 h-6 bg-blue-800 dark:bg-blue-500 rounded-full"></span>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200">Porteros</h3>
        </div>
        <GoalKeeperTable :goalKeepers="goalKeepers" :team="team" />
        <!-- DEFENSAS -->
        <div class="flex items-center gap-2 mb-1 mt-5">
          <span class="w-1 h-6 bg-blue-800 dark:bg-blue-500 rounded-full"></span>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200">Defensas</h3>
        </div>
        <DefendersTable :defenders="defenders" :team="team"/>
        <!-- MEDIOCAMPISTAS -->
        <div class="flex items-center gap-2 mb-1 mt-5">
          <span class="w-1 h-6 bg-blue-800 dark:bg-blue-500 rounded-full"></span>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200">Mediocampistas</h3>
        </div>         
        <MidfieldersTable :midFielders="midFielders" :team="team"/>
        <!-- DELANTEROS -->
        <div class="flex items-center gap-2 mb-1 mt-5">
          <span class="w-1 h-6 bg-blue-800 dark:bg-blue-500 rounded-full"></span>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200">Delanteros</h3>
        </div> 
        <ForwardsTable :forwards="forwards" :team="team"/>

        <div class="bg-blue-500/20 border border-blue-500/80 p-4 rounded-xl flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p class="text-sm text-blue-500 font-medium">Última actualización: hace 2 horas</p>
          <div class="flex gap-3">
            <button class="px-4 py-2 text-slate-600 dark:text-slate-400 font-medium text-sm hover:underline">Imprimir Plantilla</button>
            <button class="bg-blue-800 hover:bg-blue-600/90 text-white px-6 py-2 rounded font-bold text-sm shadow-sm hover:shadow-md transition-all">
              <FaIcon icon="fa-user-plus"/>
              Añadir Jugador
            </button>
          </div>
        </div>        
      </section>
      
    </div>
  </div>
</template>


<style scoped>

</style>