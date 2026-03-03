<script setup lang="ts">
import AppDataTable from '../ui/AppDataTable.vue';

const columns = [
  'Zona',
  'Local',
  'Marcador',
  'Visitante',
  'Fecha / Hora',
  'Lugar',
]

const rows = [
  ['Norte', 'Linces del Desierto', '0 - 0', 'Soles de Sonora', '24 Mar, 19:30', 'Estadio del Sol'],
  ['Golfo', 'Delfines FC', '0 - 0', 'Tiburones Rojos', 'Hoy, 19:00', 'Estadio Principal'],
  ['Norte', 'Coyotes Sierra', '0 - 0', 'Lobos Saltillo', 'Mañana, 09:00', 'Cancha 5'],
  ['Golfo', 'Astilleros FC', '0 - 0', 'Piratas de Campeche', '28 Mar, 10:00', 'Cancha 1'],
  ['Norte', 'Guerreros Coahuila', '0 - 0', 'Tigres del Norte', '26 Mar, 10:00', 'Cancha 2'],
  ['Golfo', 'Estibadores', '0 - 0', 'Petroleros FC', '24 Mar, 16:00', 'Cancha 2'],
  ['Norte', 'Indios Bravos', '0 - 0', 'Vaqueros Juárez', 'Hoy, 18:00', 'Cancha Norte 1'],
  ['Golfo', 'Pescadores Laguna', '0 - 0', 'Marismas FC', '28 Mar, 12:30', 'Cancha 2'],
  ['Norte', 'Titanes', '0 - 0', 'Gigantes del Acero', '28 Mar, 09:00', 'Cancha 1'],
  ['Golfo', 'Atlético Halcones', '0 - 0', 'Real Monarcas', 'Hoy, 18:30', 'Cancha 3'],
  ['Norte', 'Bravos Laredo', '0 - 0', 'Tecolotes', '25 Mar, 16:00', 'Cancha 1'],
  ['Golfo', 'Huracanes', '0 - 0', 'Tormenta FC', '25 Mar, 09:00', 'Cancha 3'],
  ['Norte', 'Osos Grises', '0 - 0', 'Pumas Chihuahua', '26 Mar, 12:00', 'Cancha Norte 3'],
  ['Golfo', 'Cangrejos Negros', '0 - 0', 'Langostas FC', '29 Mar, 08:30', 'Cancha 4'],
  ['Norte', 'Fuerza Regia', '0 - 0', 'Pioneros Reynosa', '29 Mar, 20:00', 'Estadio Municipal'],
  ['Golfo', 'Faro Central', '0 - 0', 'Arrecifes de Tabasco', '26 Mar, 20:00', 'Cancha 2'],
  ['Norte', 'Potros Durango', '0 - 0', 'Serpientes', '28 Mar, 11:00', 'Cancha 5'],
  ['Golfo', 'Marea Brava', '0 - 0', 'Club de Yates', 'Mañana, 12:00', 'Cancha 4'],
  ['Norte', 'Cazadores Juárez', '0 - 0', 'Águilas del Valle', '27 Mar, 17:00', 'Cancha 4'],
  ['Golfo', 'Corsarios CD', '0 - 0', 'Leones Marinos', 'Mañana, 10:00', 'Cancha 1'],
  ['Norte', 'Búfalos Tec', '0 - 0', 'Borregos Salvajes', 'Mañana, 11:00', 'Campo Hundido'],
  ['Golfo', 'Pelícanos', '0 - 0', 'Gaviotas FC', '27 Mar, 17:00', 'Estadio Auxiliar'],
  ['Norte', 'Centauros', '0 - 0', 'Dorados FC', '24 Mar, 17:30', 'Cancha 2'],
  ['Golfo', 'Rayos del Puerto', '0 - 0', 'Anclas Unidas', '24 Mar, 18:00', 'Estadio Principal'],
  ['Norte', 'Mineros Real', '0 - 0', 'Alacranes', 'Hoy, 20:30', 'Estadio Municipal'],
  ['Golfo', 'Vikingos Playa', '0 - 0', 'Sirenas FC', '29 Mar, 21:00', 'Estadio Principal'],
  ['Norte', 'Cardenales', '0 - 0', 'Galgos Tijuana', '25 Mar, 18:00', 'Cancha 6'],
  ['Golfo', 'Laguneros', '0 - 0', 'Muelles FC', '26 Mar, 15:00', 'Cancha 4'],
  ['Norte', 'Arrieros FC', '0 - 0', 'Campesinos Unidos', '29 Mar, 13:00', 'Cancha 2'],
  ['Golfo', 'Salineros', '0 - 0', 'Costa de Oro', '27 Mar, 19:00', 'Cancha 3'],
  ['Norte', 'Rodeo FC', '0 - 0', 'Espuelas Doradas', '27 Mar, 15:00', 'Estadio La Silla'],
  ['Golfo', 'Bahía Azul', '0 - 0', 'Navegantes', '25 Mar, 11:30', 'Cancha 1'],
]

</script>

<template>
  <section class="bg-white dark:bg-gray-800 p-6 rounded shadow overflow-hidden">
    <div class="p-6 flex items-center justify-between">
      <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100">Resultados Pendientes
        <span class="text-sm font-normal text-gray-500 ml-2">(Semana 14)</span>
      </h2>
      <div class="flex gap-2">
        <button class="bg-green-500/35 dark:bg-green-500/10  text-green-700 dark:text-green-500 hover:bg-green-700/10 text-md px-4 py-2 rounded transition-colors">
         <FaIcon icon="fa-file-csv" /> Exportar CSV
        </button>
      </div>      
    </div>
    <div class="overflow-x-auto">
      <AppDataTable
      :columns="columns"
      :rows="rows"       
      />
    </div>
  </section>
</template>

<style scoped>

</style>