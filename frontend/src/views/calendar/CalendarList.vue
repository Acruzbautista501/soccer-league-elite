<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import TeamCard from '@/components/teams/TeamCard.vue'
import AddTeamCard from '@/components/teams/AddTeamCard.vue'

import { useTeam } from '@/composables/useTeam'
import type { Team } from '@/interfaces/Team'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'

const { teams, getTeams } = useTeam()

const MAX_TEAMS_PER_REGION = 16

const router = useRouter()

type RegionTab = 'Norte' | 'Golfo'
const activeTab = ref<RegionTab>('Golfo')

onMounted(() => {
  getTeams()
})

/* Equipos región Norte */
const northTeams = computed(() => teams.value.filter((team) => team.region === 'Zona Norte'))

/* Equipos región Golfo */
const gulfTeams = computed(() => teams.value.filter((team) => team.region === 'Zona Golfo'))

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

  router.push({
    name: 'CrearEquipo',
  })
}

const openEditTeam = (team: Team) => {
  router.push({
    name: 'EditarEquipo',
    params: { id: team._id },
  })
}

const openSquadTeam = (team: Team) => {
  router.push({
    name: 'PlantillaEquipo',
    params: {
      id: team._id,
    },
  })
}
</script>

<template>
  <div class="flex-1 p-6 md:p-10">
    <div class="w-full mx-auto flex flex-col gap-8">
      <AppBreadcrumb />
      <section class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-slate-900 dark:text-slate-100 text-3xl font-black tracking-tight">
            Calendario de la Liga
          </h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">
            Gestiona los encuentros y horarios de la temporada actual.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="flex items-center gap-2 px-4 py-2.5 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-sm font-bold transition-colors"
          >
            <FaIcon icon="fa-file-pen" class="text-sm" />
            Editar Jornada
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2.5 bg-blue-800/10 dark:bg-blue-500/10 text-blue-800 dark:text-blue-500 font-bold rounded hover:bg-blue-800/20 text-sm dark:hover:bg-blue-500/20 transition-colors"
          >
            <FaIcon icon="fa-file-circle-plus" class="text-sm" />
            <span>Crear Jornada</span>
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2.5 bg-blue-800 text-white hover:bg-blue-700/90 rounded text-sm font-bold shadow-lg shadow-primary/20 transition-all"
          >
            <FaIcon icon="fa-calendar-plus" class="text-sm" />
            Programar Partido
          </button>
        </div>
      </section>
      <section>
        <div class="border-b border-slate-200 dark:border-slate-800 flex gap-8">
          <button
            @click="activeTab = 'Golfo'"
            :class="[
              'pb-4 border-b-2 text-sm transition-all duration-300',
              activeTab === 'Golfo'
                ? 'border-primary text-blue-800 dark:text-blue-500/85 font-bold'
                : 'border-transparent text-slate-400 dark:text-slate-500',
            ]"
          >
            Región Golfo ({{ gulfCount }}) equipos
          </button>
          <button
            @click="activeTab = 'Norte'"
            :class="[
              'pb-4 border-b-2 text-sm transition-all duration-300',
              activeTab === 'Norte'
                ? 'border-primary text-blue-800 dark:text-blue-500/85 font-bold'
                : 'border-transparent text-slate-400 dark:text-slate-500',
            ]"
          >
            Región Norte ({{ northCount }}) equipos
          </button>
        </div>
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2 scale-[0.98]"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 -translate-y-2 scale-[0.98]"
        >
          <div :key="activeTab">
            <!-- Región Golfo -->
            <div v-if="activeTab === 'Golfo'">
              <!-- Sin equipos -->
              <!-- <div
                v-if="gulfTeams.length === 0"
                class="flex flex-col items-center justify-center py-16"
              >
                <p class="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                  Aún no hay equipos registrados en la Región Golfo.
                </p>

                <div class="w-72">
                  <AddTeamCard region="Golfo" @create="openCreateTeam" />
                </div>
              </div> -->

              <!-- Con equipos -->
              <!-- <div
                v-else
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
              >
                <TeamCard
                  v-for="team in gulfTeams"
                  :key="team._id"
                  :team="team"
                  @edit="openEditTeam"
                  @view-roster="openSquadTeam"
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
              </div> -->

              <section
                class="flex-1 overflow-y-auto p-8 bg-background-light dark:bg-background-dark"
              >
                <!-- Jornada Selector -->
                <div class="mb-8">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">Seleccionar Jornada</h3>
                    <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
                      >Temporada 2024</span
                    >
                  </div>
                  <div class="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                    <!-- Generating some Jornada buttons -->
                    <button
                      class="flex-none px-5 py-2 rounded-full bg-blue-800 dark:bg-blue-700 text-white text-sm font-bold shadow-md"
                    >
                      Jornada 1
                    </button>
                    <button
                      class="flex-none px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 text-sm font-medium transition-all"
                    >
                      Jornada 2
                    </button>
                    <button
                      class="flex-none px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 text-sm font-medium transition-all"
                    >
                      Jornada 3
                    </button>
                    <button
                      class="flex-none px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 text-sm font-medium transition-all"
                    >
                      Jornada 4
                    </button>
                    <button
                      class="flex-none px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 text-sm font-medium transition-all"
                    >
                      Jornada 5
                    </button>
                    <button
                      class="flex-none px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 text-sm font-medium transition-all"
                    >
                      Jornada 6
                    </button>
                    <button
                      class="flex-none px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 text-sm font-medium transition-all"
                    >
                      Jornada 7
                    </button>
                    <button
                      class="flex-none px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 text-sm font-medium transition-all"
                    >
                      Jornada 8
                    </button>
                    <button
                      class="flex-none px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 text-sm font-medium transition-all"
                    >
                      Jornada 9
                    </button>
                    <button
                      class="flex-none px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 text-sm font-medium transition-all"
                    >
                      Jornada 10
                    </button>
                    <!-- ... rest up to 30 -->
                    <button
                      class="flex-none px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold"
                    >
                      Ver más...
                    </button>
                  </div>
                </div>
                <!-- Matches List -->
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <!-- Match Card 1 -->
                  <div
                    class="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                  >
                    <div class="flex items-center justify-between mb-6">
                      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <FaIcon icon="fa-calendar-days" class="text-lg" />
                        <span class="text-xs font-bold uppercase tracking-wide"
                          >12 Octubre, 2023</span
                        >
                      </div>
                      <div
                        class="px-3 py-1 bg-blue-800/10 dark:bg-blue-500/10 text-primary text-blue-800 dark:text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest"
                      >
                        Confirmado
                      </div>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-6">
                      <div class="flex flex-col items-center gap-2 flex-1 text-center">
                        <div
                          class="size-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-600"
                        >
                          <img
                            class="w-full h-full object-contain"
                            data-alt="Escudo de Tigres FC"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7d7vy76HYKe2q2iJ8uic6t7LLgINQa2V_TrYZswwqK7j_KjY213Mah8RkwfMH_pCuQ6Zfr-Yj7MiTp9PZq6Q-DCH2fThmC-IVu9DJ94mq_I_Lyerl34yrpqT6jNGUuXrrBOoEAiliNc1q63PHaLD7t3jGYHMA7y5ik42AtUM6bxU5hYrRomKvgTP3wPAkJ3yXHnKhPSvDIMBadQrg5scadUeoJbmBnjUs2ghPj5d48F0B2zT-io_JkdT1d3rloBq3Rjc1GklAA8"
                          />
                        </div>
                        <span class="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-slate-100">Tigres FC</span>
                      </div>
                      <div class="flex flex-col items-center gap-1">
                        <span class="text-2xl font-black text-slate-300 dark:text-slate-600 italic"
                          >VS</span
                        >
                        <span
                          class="text-[10px] font-bold px-2 py-0.5 bg-blue-800/10 dark:bg-blue-500/10 text-primary text-blue-800 dark:text-blue-500 rounded"
                          >16:00</span
                        >
                      </div>
                      <div class="flex flex-col items-center gap-2 flex-1 text-center">
                        <div
                          class="size-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-600"
                        >
                          <img
                            class="w-full h-full object-contain"
                            data-alt="Escudo de Leones de la Sierra"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLpjdpBLemSN6zVtQ00DanRsZsZso4P-RDSLlH_ppfiCSGuYaR0prNWtp8wMwZpBSeHoRdef7t82MDAoFH8eMC1FJoW7kW6ZlT5dfA_bhuVmnglS-kyXvG8Jv_GG0tzsbikzUMRqnE7ZmvQVW45p35cNA6s_iKAw50AgeUhUSKxl-GCzFrnZI6OhalOBf1ml60oAXh--R6edqAJrJpVepB0UW9Y6bNVXP57N3vy4GmrJuyTGQ2xVyJsuX18JS-uwsKmBxVpIl4NZ8"
                          />
                        </div>
                        <span class="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-slate-100"
                          >Leones Sierra</span
                        >
                      </div>
                    </div>
                    <div
                      class="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <FaIcon icon="fa-location-dot" class="text-sm" />
                        <span class="text-xs font-medium">Estadio Municipal</span>
                      </div>
                      <button class="text-blue-800 dark:text-blue-500 hover:text-blue-800/80 dark:hover:text-blue-500/80 transition-colors">
                        <FaIcon icon="fa-ellipsis" class="text-lg"/>
                      </button>
                    </div>
                  </div>
                  <!-- Match Card 2 -->
                  <div
                    class="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                  >
                    <div class="flex items-center justify-between mb-6">
                      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <FaIcon icon="fa-calendar-days" class="text-lg" />
                        <span class="text-xs font-bold uppercase tracking-wide"
                          >12 Octubre, 2023</span
                        >
                      </div>
                      <div
                        class="px-3 py-1 bg-blue-800/10 dark:bg-blue-500/10 text-primary text-blue-800 dark:text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest"
                      >
                        Confirmado
                      </div>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-6">
                      <div class="flex flex-col items-center gap-2 flex-1 text-center">
                        <div
                          class="size-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-600"
                        >
                          <img
                            class="w-full h-full object-contain"
                            data-alt="Escudo de Tigres FC"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7d7vy76HYKe2q2iJ8uic6t7LLgINQa2V_TrYZswwqK7j_KjY213Mah8RkwfMH_pCuQ6Zfr-Yj7MiTp9PZq6Q-DCH2fThmC-IVu9DJ94mq_I_Lyerl34yrpqT6jNGUuXrrBOoEAiliNc1q63PHaLD7t3jGYHMA7y5ik42AtUM6bxU5hYrRomKvgTP3wPAkJ3yXHnKhPSvDIMBadQrg5scadUeoJbmBnjUs2ghPj5d48F0B2zT-io_JkdT1d3rloBq3Rjc1GklAA8"
                          />
                        </div>
                        <span class="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-slate-100">Tigres FC</span>
                      </div>
                      <div class="flex flex-col items-center gap-1">
                        <span class="text-2xl font-black text-slate-300 dark:text-slate-600 italic"
                          >VS</span
                        >
                        <span
                          class="text-[10px] font-bold px-2 py-0.5 bg-blue-800/10 dark:bg-blue-500/10 text-primary text-blue-800 dark:text-blue-500 rounded"
                          >16:00</span
                        >
                      </div>
                      <div class="flex flex-col items-center gap-2 flex-1 text-center">
                        <div
                          class="size-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-600"
                        >
                          <img
                            class="w-full h-full object-contain"
                            data-alt="Escudo de Leones de la Sierra"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLpjdpBLemSN6zVtQ00DanRsZsZso4P-RDSLlH_ppfiCSGuYaR0prNWtp8wMwZpBSeHoRdef7t82MDAoFH8eMC1FJoW7kW6ZlT5dfA_bhuVmnglS-kyXvG8Jv_GG0tzsbikzUMRqnE7ZmvQVW45p35cNA6s_iKAw50AgeUhUSKxl-GCzFrnZI6OhalOBf1ml60oAXh--R6edqAJrJpVepB0UW9Y6bNVXP57N3vy4GmrJuyTGQ2xVyJsuX18JS-uwsKmBxVpIl4NZ8"
                          />
                        </div>
                        <span class="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-slate-100"
                          >Leones Sierra</span
                        >
                      </div>
                    </div>
                    <div
                      class="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <FaIcon icon="fa-location-dot" class="text-sm" />
                        <span class="text-xs font-medium">Estadio Municipal</span>
                      </div>
                      <button class="text-blue-800 dark:text-blue-500 hover:text-blue-800/80 dark:hover:text-blue-500/80 transition-colors">
                        <FaIcon icon="fa-ellipsis" class="text-lg"/>
                      </button>
                    </div>
                  </div>
                  <!-- Match Card 3 -->
                  <div
                    class="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                  >
                    <div class="flex items-center justify-between mb-6">
                      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <FaIcon icon="fa-calendar-days" class="text-lg" />
                        <span class="text-xs font-bold uppercase tracking-wide"
                          >12 Octubre, 2023</span
                        >
                      </div>
                      <div
                        class="px-3 py-1 bg-blue-800/10 dark:bg-blue-500/10 text-primary text-blue-800 dark:text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest"
                      >
                        Confirmado
                      </div>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-6">
                      <div class="flex flex-col items-center gap-2 flex-1 text-center">
                        <div
                          class="size-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-600"
                        >
                          <img
                            class="w-full h-full object-contain"
                            data-alt="Escudo de Tigres FC"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7d7vy76HYKe2q2iJ8uic6t7LLgINQa2V_TrYZswwqK7j_KjY213Mah8RkwfMH_pCuQ6Zfr-Yj7MiTp9PZq6Q-DCH2fThmC-IVu9DJ94mq_I_Lyerl34yrpqT6jNGUuXrrBOoEAiliNc1q63PHaLD7t3jGYHMA7y5ik42AtUM6bxU5hYrRomKvgTP3wPAkJ3yXHnKhPSvDIMBadQrg5scadUeoJbmBnjUs2ghPj5d48F0B2zT-io_JkdT1d3rloBq3Rjc1GklAA8"
                          />
                        </div>
                        <span class="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-slate-100">Tigres FC</span>
                      </div>
                      <div class="flex flex-col items-center gap-1">
                        <span class="text-2xl font-black text-slate-300 dark:text-slate-600 italic"
                          >VS</span
                        >
                        <span
                          class="text-[10px] font-bold px-2 py-0.5 bg-blue-800/10 dark:bg-blue-500/10 text-primary text-blue-800 dark:text-blue-500 rounded"
                          >16:00</span
                        >
                      </div>
                      <div class="flex flex-col items-center gap-2 flex-1 text-center">
                        <div
                          class="size-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-600"
                        >
                          <img
                            class="w-full h-full object-contain"
                            data-alt="Escudo de Leones de la Sierra"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLpjdpBLemSN6zVtQ00DanRsZsZso4P-RDSLlH_ppfiCSGuYaR0prNWtp8wMwZpBSeHoRdef7t82MDAoFH8eMC1FJoW7kW6ZlT5dfA_bhuVmnglS-kyXvG8Jv_GG0tzsbikzUMRqnE7ZmvQVW45p35cNA6s_iKAw50AgeUhUSKxl-GCzFrnZI6OhalOBf1ml60oAXh--R6edqAJrJpVepB0UW9Y6bNVXP57N3vy4GmrJuyTGQ2xVyJsuX18JS-uwsKmBxVpIl4NZ8"
                          />
                        </div>
                        <span class="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-slate-100"
                          >Leones Sierra</span
                        >
                      </div>
                    </div>
                    <div
                      class="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <FaIcon icon="fa-location-dot" class="text-sm" />
                        <span class="text-xs font-medium">Estadio Municipal</span>
                      </div>
                      <button class="text-blue-800 dark:text-blue-500 hover:text-blue-800/80 dark:hover:text-blue-500/80 transition-colors">
                        <FaIcon icon="fa-ellipsis" class="text-lg"/>
                      </button>
                    </div>
                  </div>
                  <!-- Match Card 4 -->
                  <div
                    class="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                  >
                    <div class="flex items-center justify-between mb-6">
                      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <FaIcon icon="fa-calendar-days" class="text-lg" />
                        <span class="text-xs font-bold uppercase tracking-wide"
                          >12 Octubre, 2023</span
                        >
                      </div>
                      <div
                        class="px-3 py-1 bg-blue-800/10 dark:bg-blue-500/10 text-primary text-blue-800 dark:text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest"
                      >
                        Confirmado
                      </div>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-6">
                      <div class="flex flex-col items-center gap-2 flex-1 text-center">
                        <div
                          class="size-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-600"
                        >
                          <img
                            class="w-full h-full object-contain"
                            data-alt="Escudo de Tigres FC"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7d7vy76HYKe2q2iJ8uic6t7LLgINQa2V_TrYZswwqK7j_KjY213Mah8RkwfMH_pCuQ6Zfr-Yj7MiTp9PZq6Q-DCH2fThmC-IVu9DJ94mq_I_Lyerl34yrpqT6jNGUuXrrBOoEAiliNc1q63PHaLD7t3jGYHMA7y5ik42AtUM6bxU5hYrRomKvgTP3wPAkJ3yXHnKhPSvDIMBadQrg5scadUeoJbmBnjUs2ghPj5d48F0B2zT-io_JkdT1d3rloBq3Rjc1GklAA8"
                          />
                        </div>
                        <span class="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-slate-100">Tigres FC</span>
                      </div>
                      <div class="flex flex-col items-center gap-1">
                        <span class="text-2xl font-black text-slate-300 dark:text-slate-600 italic"
                          >VS</span
                        >
                        <span
                          class="text-[10px] font-bold px-2 py-0.5 bg-blue-800/10 dark:bg-blue-500/10 text-primary text-blue-800 dark:text-blue-500 rounded"
                          >16:00</span
                        >
                      </div>
                      <div class="flex flex-col items-center gap-2 flex-1 text-center">
                        <div
                          class="size-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-600"
                        >
                          <img
                            class="w-full h-full object-contain"
                            data-alt="Escudo de Leones de la Sierra"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLpjdpBLemSN6zVtQ00DanRsZsZso4P-RDSLlH_ppfiCSGuYaR0prNWtp8wMwZpBSeHoRdef7t82MDAoFH8eMC1FJoW7kW6ZlT5dfA_bhuVmnglS-kyXvG8Jv_GG0tzsbikzUMRqnE7ZmvQVW45p35cNA6s_iKAw50AgeUhUSKxl-GCzFrnZI6OhalOBf1ml60oAXh--R6edqAJrJpVepB0UW9Y6bNVXP57N3vy4GmrJuyTGQ2xVyJsuX18JS-uwsKmBxVpIl4NZ8"
                          />
                        </div>
                        <span class="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-slate-100"
                          >Leones Sierra</span
                        >
                      </div>
                    </div>
                    <div
                      class="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <FaIcon icon="fa-location-dot" class="text-sm" />
                        <span class="text-xs font-medium">Estadio Municipal</span>
                      </div>
                      <button class="text-blue-800 dark:text-blue-500 hover:text-blue-800/80 dark:hover:text-blue-500/80 transition-colors">
                        <FaIcon icon="fa-ellipsis" class="text-lg"/>
                      </button>
                    </div>
                  </div>
                  <!-- More cards for the remaining 4 matches of the 8 total per round -->
                  <div class="xl:col-span-2 text-center py-6">
                    <p class="text-slate-400 text-sm">Mostrando 4 de 8 partidos programados</p>
                    <button class="mt-4 text-blue-800 dark:text-blue-500 font-bold text-sm hover:underline">
                      Ver todos los partidos
                    </button>
                  </div>
                </div>
              </section>
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
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
              >
                <TeamCard
                  v-for="team in northTeams"
                  :key="team._id"
                  :team="team"
                  @edit="openEditTeam"
                  @view-roster="openSquadTeam"
                />

                <!-- CTA solo si aún hay cupo -->
                <AddTeamCard v-if="!isNorthFull" region="Norte" @create="openCreateTeam" />

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
          </div>
        </Transition>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
