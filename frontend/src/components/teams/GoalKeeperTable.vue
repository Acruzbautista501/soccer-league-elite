<script setup lang="ts">
import PlayersTable from './PlayersTable.vue';

</script>

<template>
  <PlayersTable> 
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
      <td class="dark:text-slate-400 px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
            <img class="w-full h-full object-cover" data-alt="Marc André player portrait photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_V50F0ibQRdrxXmSnYeloZT9lD09j6PrNH6S8CTwt1MHsR3si_BJoIpttgnisT6AbEpJQJrPXRbFvW77zN3X5QnDbS1MF9A8vtTyySvmcEGfs-ii-1fHPhadP67NVYDZYmE62YecuoaXS976AHAUAq0eiSubKUkFfNpFY8sJGYji1RtgQS7IOSBn3tZOH2-TJ4C28MHUM1AwNo6-zMkIWcsqLiCuQrqyfBeFnbT6E6nsOBbyZGLho97pX7XMYIlM2gL8vKJzyFtk"/>
          </div>
          <div>
            <p class="text-sm font-bold">Marc André</p>
            <p class="text-xs text-slate-500">Titular</p>
          </div>
        </div>
      </td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm font-medium">1</td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm">31</td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm">Alemania</td>
      <td class="dark:text-slate-400 px-6 py-4 text-center text-sm">0</td>
      <td class="dark:text-slate-400 px-6 py-4 text-center text-sm">0</td>
    </tr>
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
      <td class="dark:text-slate-400 px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
            <img class="w-full h-full object-cover" data-alt="Iñaki Peña player portrait photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtrnqaQehyHhAUpJTFx-QAJount-IPW99t6ZKH2E0iJVTtlcZTqg4MRE7FMFW1mRnACGthV8Fej6HF6uzTzj4axSz8QbX1tjTTyEJAPqWnjXhwnZ7VvyQ4glp_W8vn74pRPsZFs7GDqbmKSJDOTURgcIkXkYvt6YygbInatcs83mW-HgpgNz3WZbUqoQZqMgRBAjQT1smptQQ9SNm_Xv62ut3i232SAoJJsg-6nR_kpr_w0JSQMnrYXxR2OSRHd73Ag8yhrnGUjW0"/>
          </div>
          <div>
            <p class="text-sm font-bold">Iñaki Peña</p>
            <p class="text-xs text-slate-500">Suplente</p>
          </div>
        </div>
      </td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm font-medium">13</td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm">24</td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm">España</td>
      <td class="dark:text-slate-400 px-6 py-4 text-center text-sm">0</td>
      <td class="dark:text-slate-400 px-6 py-4 text-center text-sm">0</td>
    </tr>
  </PlayersTable>
</template>

<style scoped>

</style>