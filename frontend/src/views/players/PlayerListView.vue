<script setup lang="ts">
import { onMounted } from 'vue'
import { useTeam } from '@/composables/useTeam'
import { useRoute, useRouter } from 'vue-router'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import AppDataTable from '@/components/ui/AppDataTable.vue'
import type { DataTableColumn } from '@/components/ui/AppDataTable.vue'
import { getImagePlayerUrl } from '@/utils/getImage'
import type { Player, Team } from '@/interfaces/Team'

const { team, teamPlayer, getPlayersTeam } = useTeam()

const router = useRouter()
const route = useRoute()

const teamId = route.params.id as string
const teamNamePlayer = route.query.name as string

onMounted(() => {
  getPlayersTeam(teamId)
})

const columns: DataTableColumn[] = [
  { key: 'fullName',  label: 'Jugador',   sortable: true },
  { key: 'number',   label: 'Dorsal',    sortable: true, numeric: true },
  { key: 'position', label: 'Posición',  sortable: true },
  { key: 'status',   label: 'Estado',    sortable: true },
  { key: '_actions', label: 'Acciones',  align: 'right' },
]

const openAddPlayer = (team: Team) => {
  router.push({
    name: 'AgregarJugador',
    params: { name: team.name },
    query: { id: team._id }
  })
}

const openEditPlayer = (player: Player) => {
  router.push({
    name: 'EditarJugador',
    params: { name: teamNamePlayer },
    query: { id: player._id, teamId: player.team }
  })
}
</script>

<template>
  <div class="flex-1 p-6 md:p-10">
    <div class="w-full mx-auto flex flex-col gap-8">
      <AppBreadcrumb />

      <!-- Header -->
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

      <!-- DataTable -->
      <section>
        <AppDataTable
          :data="teamPlayer"
          :columns="columns"
          search-placeholder="Buscar jugador, dorsal, posición..."
          :search-fields="['fullName', 'number', 'position', 'status']"
          empty-message="No se encontraron jugadores."
          item-label="jugadores"
        >
          <template #body="{ items }">
            <tr
              v-for="player in items"
              :key="player._id"
              class="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <!-- Jugador -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img
                    class="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    :src="getImagePlayerUrl(player.photo)"
                    :alt="player.fullName"
                  />
                  <div>
                    <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ player.fullName }}</p>
                    <p class="text-xs text-slate-500">{{ player.isStarter }}</p>
                  </div>
                </div>
              </td>

              <!-- Dorsal -->
              <td class="px-6 py-4">{{ player.number }}</td>

              <!-- Posición -->
              <td class="px-6 py-4">{{ player.position }}</td>

              <!-- Estado -->
              <td class="px-6 py-4">
                <span class="bg-success-soft border border-success-subtle text-fg-success-strong text-xs font-medium px-1.5 py-0.5 rounded">
                  {{ player.status }}
                </span>
              </td>

              <!-- Acciones -->
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
          </template>
        </AppDataTable>
      </section>
    </div>
  </div>
</template>
