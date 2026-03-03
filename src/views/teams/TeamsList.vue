<script setup lang="ts">
import { listenTeams } from '@/services/TeamsServices';
import { ref, computed, onMounted, onUnmounted, } from 'vue';
import type { Team } from '../../interfaces/Team';
import TeamCard from '@/components/teams/TeamCard.vue'
import AddTeamCard from '@/components/teams/AddTeamCard.vue'
import { useRouter } from 'vue-router';

const ligaId = 'LigaFutbolLlanero'

const MAX_TEAMS_PER_REGION = 16

const router = useRouter()

const teams = ref<Team[]>([])

type RegionTab = 'Norte'| 'Golfo'
const activeTab = ref<RegionTab>('Golfo')

let unsubscribe: (() => void) | null = null

// En tu componente Vue
onMounted(() => {
  // Fíjate si hay comillas extra o espacios
  unsubscribe = listenTeams(ligaId, (data) => {
    teams.value = data;
  });
})
onUnmounted(() => {
  unsubscribe?.()
})

// Equipos región Norte
const northTeams = computed(() =>
  teams.value.filter(team => team.region === 'Norte')
)

// Equipos región Golfo
const gulfTeams = computed(() =>
  teams.value.filter(team => team.region === 'Golfo')
)

const northCount = computed(() => northTeams.value.length)
const gulfCount = computed(() => gulfTeams.value.length)

const isNorthFull = computed(() => northCount.value >= MAX_TEAMS_PER_REGION)
const isGulfFull = computed(() => gulfCount.value >= MAX_TEAMS_PER_REGION)

const openCreateTeam = (region: RegionTab) => {
  if (region === 'Norte' && isNorthFull.value) {
    alert('La Región Norte ya tiene el máximo de 16 equipos.')
    return
  }

  if (region === 'Golfo' && isGulfFull.value) {
    alert('La Región Golfo ya tiene el máximo de 16 equipos.')
    return
  }

  router.push(
    {name: 'CrearEquipo'}
  )
}
</script>

<template>
  <div class="flex-1 p-6 md:p-10">
    <div class="max-w-9xl mx-auto flex flex-col gap-8">
      <section class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-slate-900 dark:text-slate-100 text-3xl font-black tracking-tight">Gestión de Equipos</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Administra los equipos participantes de la temporada actual.</p>
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
      <section>
        <div class="border-b border-slate-200 dark:border-slate-800 flex gap-8">
          <button
            @click="activeTab = 'Golfo'"
            :class="[
              'pb-4 border-b-2 text-sm transition',
              activeTab === 'Golfo'
                ? 'border-primary text-slate-900 dark:text-slate-100 font-bold'
                : 'border-transparent text-slate-400 dark:text-slate-500'
            ]"
          >
            Región Golfo ({{ gulfCount }} de {{ MAX_TEAMS_PER_REGION }}) equipos
          </button>
          <button
            @click="activeTab = 'Norte'"
            :class="[
              'pb-4 border-b-2 text-sm transition',
              activeTab === 'Norte'
                ? 'border-primary text-slate-900 dark:text-slate-100 font-bold'
                : 'border-transparent text-slate-400 dark:text-slate-500'
            ]"
          >
            Región Norte ({{ northCount }} de {{ MAX_TEAMS_PER_REGION }}) equipos
          </button>
        </div>

        <!-- Región Golfo -->
        <div v-if="activeTab === 'Golfo'">

          <!-- Sin equipos -->
          <div
            v-if="gulfTeams.length === 0"
            class="flex flex-col items-center justify-center py-16"
          >
            <p class="text-slate-500 dark:text-slate-400 mb-6 text-sm">
              Aún no hay equipos registrados en la Región Golfo.
            </p>

            <div class="w-72">
              <AddTeamCard region="Golfo" @create="openCreateTeam" />
            </div>
          </div>

          <!-- Con equipos -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <TeamCard
              v-for="team in gulfTeams"
              :key="team.id"
              :team="team"
            />

            <AddTeamCard
              v-if="!isGulfFull"
              region="Golfo"
              @create="openCreateTeam"
            />

            <div
              v-else
              class="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 p-5 text-center"
            >
              <p class="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                Región completa
              </p>
              <p class="text-xs text-emerald-600 dark:text-emerald-500 mt-1">
                Ya se registraron los 16 equipos.
              </p>
            </div>
          </div>

        </div>

        <!-- Región Norte -->
        <div v-if="activeTab === 'Norte'">

          <!-- ✅ Cuando NO hay equipos -->
          <div
            v-if="northTeams.length === 0"
            class="flex flex-col items-center justify-center py-16"
          >
            <p class="text-slate-500 dark:text-slate-400 mb-6 text-sm">
              Aún no hay equipos registrados en la Región Norte.
            </p>

            <div class="w-72">
              <AddTeamCard region="Norte" @create="openCreateTeam" />
            </div>
          </div>

          <!-- ✅ Cuando SÍ hay equipos -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <TeamCard
              v-for="team in northTeams"
              :key="team.id"
              :team="team"
            />

            <!-- CTA solo si aún hay cupo -->
            <AddTeamCard
              v-if="!isNorthFull"
              region="Norte"
              @create="openCreateTeam"
            />

            <!-- Mensaje cuando se llena -->
            <div
              v-else
              class="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 p-5 text-center"
            >
              <p class="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                Región completa
              </p>
              <p class="text-xs text-emerald-600 dark:text-emerald-500 mt-1">
                Ya se registraron los 16 equipos.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>

</style>