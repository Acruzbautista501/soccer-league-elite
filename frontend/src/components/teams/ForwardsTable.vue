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
						data-alt="Lamine Yamal player portrait photo"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxgdT7lwxsg1_lm-MqmYW8QOn1OXZfVS1AGfEThtts4uLHOcDYcjosBYXsGkBHbLy755KHIG2pc4nEWa6wOOOcWyYKiEXsTMMrZusIzIV6WqcasHKLozOHDChooCgHJXY1uFUyHci9y2Cg-yVD81chwsmIDQfKgfJuvA1k5N_aSHJhjpldmQWfrB2HZGRKSTyxyQqqBTW5O4AbFqM96m3MmFSEByuM4-bDqdNYc7gwhihGeEWHY5hecDI4i6bTo8okBDyU7MHk_RE"
					/>
				</div>
				<div>
					<p class="text-sm font-bold">Lamine Yamal</p>
					<p class="text-xs text-slate-500">Extremo</p>
				</div>
			</div>
		</td>
		<td class="dark:text-slate-400 px-6 py-4 text-sm font-medium">19</td>
		<td class="dark:text-slate-400 px-6 py-4 text-sm">16</td>
		<td class="dark:text-slate-400 px-6 py-4 text-sm">España</td>
		<td class="dark:text-slate-400 px-6 py-4 text-center text-sm">8</td>
		<td class="dark:text-slate-400 px-6 py-4 text-center text-sm">15</td>
	</tr>
	<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
		<td class="dark:text-slate-400 px-6 py-4 w-1/4">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
					<img
						class="w-full h-full object-cover"
						data-alt="Robert Lewandowski player portrait photo"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuB26Tt8fPE-yO6HfyopxNVGw1v0fV-YPGCOwLmNIsqeYaszMBAioBz0YVRkfHfSm625WKZzLexfV3kE0KtZt8JPsv_GN4DeOtg7zG3vNXwzXushcDJAwL4CNgzQMLnBNzxoULIWQM3oDrueL2I4RqSxyAZpX4O69CLdiOXl5oHiR_sLyiuNz_IN2EPSvOEF7QykI0dwsk1lL0GXNBn8O7gHLqcWq9PNRaI1bLYiiHLax7pbZ47zkSVCBDyH8_qkMUBX_gngpgY74Jg"
					/>
				</div>
				<div>
					<p class="text-sm font-bold">R. Lewandowski</p>
					<p class="text-xs text-slate-500">Delantero Centro</p>
				</div>
			</div>
		</td>
		<td class="dark:text-slate-400 px-6 py-4 text-sm font-medium">9</td>
		<td class="dark:text-slate-400 px-6 py-4 text-sm">35</td>
		<td class="dark:text-slate-400 px-6 py-4 text-sm">Polonia</td>
		<td class="dark:text-slate-400 px-6 py-4 text-center text-sm">24</td>
		<td class="dark:text-slate-400 px-6 py-4 text-center text-sm">4</td>
	</tr>
</PlayersTable>
</template>

<style scoped>

</style>