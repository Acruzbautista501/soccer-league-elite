<script setup lang="ts">
import PlayersTable from './PlayersTable.vue';


</script>

<template>
  <PlayersTable>
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
      <td class="dark:text-slate-400 px-6 py-4 w-1/4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
            <img class="w-full h-full object-cover" data-alt="Pau Cubarsí player portrait photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGu7coDkgCBvkrq9Qim5e7jC3xnq0w7bxAPry-Ir88zoZCuVdOUyFzw_b9aXMQIyzrdvpAENqE9zcwV-5BaYBlVkWA-hsyMNTTK_g2hUxGHv6rBtBkBYT0F_I-BGz07xhdxkxaTOTaZInfYww1TTcFW3VfRmWDAk8EapQ3w4cF8TNPaVMeph5HgVP7RIqxrd0hW6SEQ26S8X83zcRKSFfnd8BfGYC0F5BkIlmvFhi4dzcmrFx-OaZAcdE32J03zMhz5XZane6SAw0"/>
          </div>
          <div>
            <p class="text-sm font-bold">Pau Cubarsí</p>
            <p class="text-xs text-slate-500">Central</p>
          </div>
        </div>
      </td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm font-medium">2</td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm">17</td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm">España</td>
      <td class="dark:text-slate-400 px-6 py-4 text-center text-sm">1</td>
      <td class="dark:text-slate-400 px-6 py-4 text-center text-sm">0</td>
    </tr>
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
      <td class="dark:text-slate-400 px-6 py-4 w-1/4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
            <img class="w-full h-full object-cover" data-alt="Ronald Araujo player portrait photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd3DcReeUU3xqbDF_DIzAOpFHQ9QhRQAXC_JvicbPZeByeLVZVKrGnm33J2iOTYm2-m67hs4CXm1b9V2FsbCVYVek7-SKl1Nm4g1K4f61bHRo6Flr4DlzvHGpg_xNsH272ljLerslcQ-C1D3PS1rr7opnxzp2T6hjzDrdoMWhj2tTV44CzFPMqSEYhsFFkXo5tz7y9zrpv4JPsW_WgRb2UqmbuZfXn2UIBdvblhxI9AEaLkPKzocahqE9z1thzxGbNjwqZxIenkks"/>
          </div>
          <div>
            <p class="text-sm font-bold">Ronald Araujo</p>
            <p class="text-xs text-slate-500">Central</p>
          </div>
        </div>
      </td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm font-medium">4</td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm">25</td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm">Uruguay</td>
      <td class="dark:text-slate-400 px-6 py-4 text-center text-sm">3</td>
      <td class="dark:text-slate-400 px-6 py-4 text-center text-sm">1</td>
    </tr>
  </PlayersTable>
</template>

<style scoped>

</style>