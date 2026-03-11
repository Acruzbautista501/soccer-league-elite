<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getImageUrl } from '@/utils/getImage'
import { useTeam } from '@/composables/useTeam';
import { onMounted } from 'vue';
import GoalKeeperTable from '@/components/teams/GoalKeeperTable.vue';
import DefendersTable from '@/components/teams/DefendersTable.vue';
import MidfieldersTable from '@/components/teams/MidfieldersTable.vue';
import ForwardsTable from '@/components/teams/ForwardsTable.vue';
import type { Team } from '@/interfaces/Team';

const route = useRoute()
const router = useRouter()

const { team, teamPlayer, getTeam, getPlayersTeam} = useTeam()

const teamId = route.params.id as string

const openAddPlayer = (team: Team) => {
  router.push({
    name: 'AgregarJugador',
    params: {
      name: team.name
    }
  })
}

onMounted( async () => {
  getTeam(teamId)
  getPlayersTeam(teamId)
})

</script>
<template>
  <div class="flex-1 p-6 md:p-10">
    <div class="max-w-9xl mx-auto flex flex-col gap-8">
      <section class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-xl p-2 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
            <img alt="Escudo Equipo" class="w-12 h-12 object-contain" data-alt="Rayo del Norte FC official team crest" :src="getImageUrl(team.logoUrl)">
          </div>
          <div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{team.name}}</h2>
            <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
              <FaIcon icon="fa-location-dot"/>
              {{team.city}}
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between gap-4">
          <button
            @click="router.back()" 
            class="flex items-center gap-2 px-4 py-2 text-md font-medium border text-slate-600 dark:text-slate-400 border-slate-400 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <FaIcon icon="fa-circle-arrow-left" class="text-xl"/>
            Volver
          </button>
          <button v-if="teamPlayer.length > 0" class="bg-blue-800 hover:bg-blue-600/90 text-white px-4 py-2 rounded font-bold text-md shadow-sm flex items-center gap-2 transition-all">
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
        <GoalKeeperTable />
        <!-- DEFENSAS -->
        <div class="flex items-center gap-2 mb-1 mt-5">
          <span class="w-1 h-6 bg-blue-800 dark:bg-blue-500 rounded-full"></span>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200">Defensas</h3>
        </div>
        <DefendersTable />
        <!-- MEDIOCAMPISTAS -->
        <div class="flex items-center gap-2 mb-1 mt-5">
          <span class="w-1 h-6 bg-blue-800 dark:bg-blue-500 rounded-full"></span>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200">Mediocampistas</h3>
        </div>         
        <MidfieldersTable />
        <!-- DELANTEROS -->
        <div class="flex items-center gap-2 mb-1 mt-5">
          <span class="w-1 h-6 bg-blue-800 dark:bg-blue-500 rounded-full"></span>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200">Delanteros</h3>
        </div> 
        <ForwardsTable />

        <div class="bg-blue-500/20 border border-blue-500/80 p-4 rounded-xl flex items-center justify-between">
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