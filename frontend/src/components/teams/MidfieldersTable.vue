<script setup lang="ts">
import PlayersTable from './PlayersTable.vue';


</script>

<template>
  <PlayersTable>
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
      <td class="dark:text-slate-400 px-6 py-4 w-1/4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
            <img
              class="w-full h-full object-cover"
              data-alt="Pedri player portrait photo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDceiNlMGPih-TWJPiKCmDR-dGjO1NVoo0hD1JA5sj0AC5AozKZO21oP3Uz0g9slEq7IASkOfPMZ6oSOxRop5ZAEktVwTk9ge6Mvd1xihYgprckJAuj0Qv-fW80mdjsrKLvuzLfOH3n7dF9QX71L6JOYbQgwwP42B73Mn4EJlghqqCDJ9Qal6iO2x98m6cJJenGwlpX_3TfUx6r4an0-jtEmv3HylT5mr-4HOI_z1D5A2rGYRaq6ILFrAnqQRpS8DabaHlQ139t3qs"
            />
          </div>
          <div>
            <p class="text-sm font-bold">Pedri González</p>
            <p class="text-xs text-slate-500">Interior</p>
          </div>
        </div>
      </td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm font-medium">8</td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm">21</td>
      <td class="dark:text-slate-400 px-6 py-4 text-sm">España</td>
      <td class="dark:text-slate-400 px-6 py-4 text-center text-sm">5</td>
      <td class="dark:text-slate-400 px-6 py-4 text-center text-sm">12</td>
    </tr>    
  </PlayersTable>
</template>

<style scoped>

</style>