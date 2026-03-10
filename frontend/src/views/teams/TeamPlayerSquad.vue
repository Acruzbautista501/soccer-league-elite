<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

const teamId = route.params.id as string

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
            <div class="bg-blue-500/10 dark:bg-blue-500/30 text-blue-800 dark:text-blue-500 p-2 rounded-lg"><FaIcon icon="fa-earth-america" class="text-lg"/></div>
            <div>
              <p class="text-2xs text-slate-400 uppercase font-bold">Zona Golfo</p>
              <p class="text-sm font-bold text-slate-800 dark:text-slate-100">{{ gulfCount }} de {{ MAX_TEAMS_PER_REGION }} Equipos</p>
            </div>
          </div>
          <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
            <div class="bg-blue-500/10 dark:bg-blue-500/30 text-blue-800 dark:text-blue-500 p-2 rounded-lg"><FaIcon icon="fa-compass" class="text-lg"/></div>
            <div>
              <p class="text-2xs text-slate-400 uppercase font-bold">Zona Norte</p>
              <p class="text-sm font-bold text-slate-800 dark:text-slate-100">{{ northCount }} de {{ MAX_TEAMS_PER_REGION }} Equipos</p>
            </div>
          </div>
        </div> -->
      </section>
      <section class="grid gap-6">

        <!-- PORTEROS -->
        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
          
          <div class="flex items-center gap-2 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <span class="w-1 h-6 bg-primary rounded-full"></span>
            <h3 class="font-bold text-slate-800 dark:text-slate-200">Porteros</h3>
          </div>

          <div class="divide-y divide-slate-100 dark:divide-slate-700">

            <div class="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/40">
              <div class="flex items-center gap-3">

                <img class="w-10 h-10 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/men/32.jpg" />

                <div>
                  <p class="font-bold text-sm">Marc André</p>
                  <p class="text-xs text-slate-500">Titular</p>
                </div>

              </div>

              <div class="flex items-center gap-6 text-sm">

                <span>#1</span>
                <span>31</span>
                <span>🇩🇪</span>

                <button class="text-slate-400 hover:text-primary">
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>

              </div>
            </div>

            <div class="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/40">
              <div class="flex items-center gap-3">

                <img class="w-10 h-10 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/men/42.jpg" />

                <div>
                  <p class="font-bold text-sm">Iñaki Peña</p>
                  <p class="text-xs text-slate-500">Suplente</p>
                </div>

              </div>

              <div class="flex items-center gap-6 text-sm">

                <span>#13</span>
                <span>24</span>
                <span>🇪🇸</span>

                <button class="text-slate-400 hover:text-primary">
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>

              </div>
            </div>

          </div>

        </div>


        <!-- DEFENSAS -->
        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">

          <div class="flex items-center gap-2 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <span class="w-1 h-6 bg-primary rounded-full"></span>
            <h3 class="font-bold text-slate-800 dark:text-slate-200">Defensas</h3>
          </div>

          <div class="divide-y divide-slate-100 dark:divide-slate-700">

            <div class="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/40">
              <div class="flex items-center gap-3">

                <img class="w-10 h-10 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/men/11.jpg" />

                <div>
                  <p class="font-bold text-sm">Pau Cubarsí</p>
                  <p class="text-xs text-slate-500">Central</p>
                </div>

              </div>

              <div class="flex items-center gap-6 text-sm">

                <span>#2</span>
                <span>17</span>
                <span>🇪🇸</span>

                <button class="text-slate-400 hover:text-primary">
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>

              </div>
            </div>

          </div>

        </div>


        <!-- MEDIOCAMPISTAS -->
        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">

          <div class="flex items-center gap-2 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <span class="w-1 h-6 bg-primary rounded-full"></span>
            <h3 class="font-bold text-slate-800 dark:text-slate-200">Mediocampistas</h3>
          </div>

          <div class="divide-y divide-slate-100 dark:divide-slate-700">

            <div class="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/40">
              <div class="flex items-center gap-3">

                <img class="w-10 h-10 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/men/22.jpg" />

                <div>
                  <p class="font-bold text-sm">Pedri</p>
                  <p class="text-xs text-slate-500">Interior</p>
                </div>

              </div>

              <div class="flex items-center gap-6 text-sm">

                <span>#8</span>
                <span>21</span>
                <span>🇪🇸</span>

                <button class="text-slate-400 hover:text-primary">
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>

              </div>
            </div>

          </div>

        </div>


        <!-- DELANTEROS -->
        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">

          <div class="flex items-center gap-2 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <span class="w-1 h-6 bg-primary rounded-full"></span>
            <h3 class="font-bold text-slate-800 dark:text-slate-200">Delanteros</h3>
          </div>

          <div class="divide-y divide-slate-100 dark:divide-slate-700">

            <div class="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/40">
              <div class="flex items-center gap-3">

                <img class="w-10 h-10 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/men/66.jpg" />

                <div>
                  <p class="font-bold text-sm">Lewandowski</p>
                  <p class="text-xs text-slate-500">Delantero</p>
                </div>

              </div>

              <div class="flex items-center gap-6 text-sm">

                <span>#9</span>
                <span>35</span>
                <span>🇵🇱</span>

                <button class="text-slate-400 hover:text-primary">
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>

              </div>
            </div>

          </div>

        </div>

      </section>
    </div>
  </div>
</template>


<style scoped>

</style>