<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useRoute, useRouter } from 'vue-router'
import { usePlayer } from '@/composables/usePalyer'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import { getImagePlayerUrl, formatDateForInput } from '@/utils/getImage'

const router = useRouter()
const route = useRoute()

const teamId = route.query.teamId as string
const playerId = route.query.id as string

const teamNamePlayer = computed(() => {
  if (typeof player.value.team === 'string') return ''
  return player.value.team.name
})
console.log(teamId)

const { player, updatePlayerForm, getPlayer, updatePlayer, } = usePlayer()


const logoFile = ref<File | null>(null)
const preview = ref<string | null>(null)
const logoError = ref<string | null>(null)

const handleLogoChange = (e: Event) => {
  const input = e.target as HTMLInputElement

  const file = input.files?.[0]

  if (!file) return

  logoError.value = null

  const allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg+xml'
  ]

  // validar tipo
  if (!allowedTypes.includes(file.type)) {
    logoError.value = 'Solo se permiten imágenes PNG, JPG o SVG'
    logoFile.value = null
    return
  }

  // validar tamaño (2MB)
  const maxSize = 2 * 1024 * 1024

  if (file.size > maxSize) {
    logoError.value = 'La imagen no puede superar los 2MB'
    logoFile.value = null
    return
  }

  // guardar archivo
  logoFile.value = file

  // preview
  preview.value = URL.createObjectURL(file)
}

// Esquema de validación

const schema = toTypedSchema(
  z.object({
    fullName: z
      .string()
      .min(3, 'El nombre del jugador debe tener mínimo 3 caracteres.'),

    age: z
      .number({ invalid_type_error: 'La edad debe ser un número.' })
      .min(5, 'Edad inválida')
      .max(60, 'Edad inválida'),

    birthDate: z
      .string()
      .min(1, 'La fecha de nacimiento es obligatoria.'),

    number: z
      .number({ invalid_type_error: 'El número debe ser numérico.' })
      .min(1, 'Número inválido')
      .max(99, 'Número inválido'),

    position: z.enum(['Portero', 'Defensa', 'Mediocampista', 'Delantero'], {
      required_error: 'Selecciona una posición.'
    }),

    isStarter: z.enum(['Suplente', 'Titular',], {
      required_error: 'Selecciona si es titular o suplente'
    }),

    status: z
      .enum(['Activo', 'Lesionado', 'Inactivo'], {
        required_error: 'Selecciona el estado del jugador'
    }),

    city: z
      .string()
      .min(2, 'La ciudad es obligatoria.'),

    height: z
      .number({ invalid_type_error: 'La altura debe ser un número.' })
      .min(1, 'Altura inválida'),

    weight: z
      .number({ invalid_type_error: 'El peso debe ser un número.' })
      .min(1, 'Peso inválido')
  })
)

const { handleSubmit, errors, defineField, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    fullName: '',
    age: 0,
    birthDate: '',
    number: 0,
    position: 'Portero',
    isStarter: 'Suplente',
    status: 'Activo',
    city: '',
    height: 0,
    weight: 0
  }
})

// campos reactivos
const [fullName] = defineField('fullName')
const [age] = defineField('age')
const [birthDate] = defineField('birthDate')
const [number] = defineField('number')
const [position] = defineField('position')
const [isStarter] = defineField('isStarter')
const [status] = defineField('status')
const [city] = defineField('city')
const [height] = defineField('height')
const [weight] = defineField('weight')
// Agregar nuevo equipo
const updateInfoPlayer = handleSubmit(async (values) => {

  updatePlayerForm.fullName = values.fullName
  updatePlayerForm.age = values.age
  updatePlayerForm.birthDate = values.birthDate
  updatePlayerForm.number= values.number
  updatePlayerForm.position = values.position
  updatePlayerForm.isStarter = values.isStarter
  updatePlayerForm.status = values.status
  updatePlayerForm.city = values.city
  updatePlayerForm.height = values.height
  updatePlayerForm.weight = values.weight

  await updatePlayer(logoFile.value)
})

onMounted(async () => {
  await getPlayer(playerId)

  setValues({
    fullName: player.value.fullName,
    age: player.value.age,
    birthDate: formatDateForInput(player.value.birthDate),
    number: player.value.number,
    position: player.value.position,
    isStarter: player.value.isStarter,
    status: player.value.status,
    city: player.value.city,
    height: player.value.height,
    weight: player.value.weight    
  })

  updatePlayerForm._id = player.value._id
  updatePlayerForm.team = teamId

  if (player.value.photo) {
    preview.value = getImagePlayerUrl(player.value.photo)
  }
})
</script>

<template>
  <div class="flex-1 p-6 md:p-10">
    <div class="w-full mx-auto flex flex-col gap-8">
      <AppBreadcrumb />
      <section class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-slate-900 dark:text-slate-100 text-3xl font-black tracking-tight">Editar Jugador</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Actualiza la información del jugador en la plantilla oficial de <span class="font-semibold">{{ teamNamePlayer }}</span>.</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="router.back()" 
            class="flex items-center gap-2 px-4 py-2 text-lg font-medium border text-slate-600 dark:text-slate-400 border-slate-400 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <FaIcon icon="fa-circle-arrow-left" class="text-xl"/>
            Volver
          </button>           
          <button
            type="submit"
            form="edit-player"
            class="px-8 py-3 text-sm font-bold text-white bg-blue-800 hover:bg-blue-800/90 rounded shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <FaIcon icon="fa-pen-to-square" class="text-white text-lg"/>
            Editar Jugador
          </button>
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
      <form id="edit-player" class="grid grid-cols-1 lg:grid-cols-3 gap-8" @submit.prevent="updateInfoPlayer">
        <!-- Photo Upload Section -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h2 class="text-slate-900 dark:text-white text-lg font-bold mb-4">
              Foto del Jugador
            </h2>
            <label
              class="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 px-4 py-10 hover:border-primary transition-colors cursor-pointer group"
            >
              <!-- PREVIEW -->
              <div
                class="size-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors overflow-hidden relative"
              >
                <img
                  v-if="preview"
                  :src="preview"
                  class="w-full h-full object-cover"
                />
                <!-- ESTADO VACÍO -->
                <template v-else>
                  <FaIcon icon="fa-user" class="text-5xl"/>
                  <div
                    class="absolute inset-0 opacity-10 bg-gradient-to-tr from-primary to-transparent"
                  ></div>
                </template>
              </div>
              <div class="text-center">
                <p class="text-slate-900 dark:text-white font-bold text-sm">
                  Subir Imagen de Perfil
                </p>
                <p class="text-slate-500 text-xs mt-2">
                  Recomendado: 400x400px JPG/PNG
                </p>
              </div>
              <div
                class="w-full flex items-center justify-center gap-2 rounded-xl h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <FaIcon icon="fa-cloud-arrow-up" class="text-lg"/>
                Seleccionar Archivo
              </div>
              <!-- INPUT FILE -->
              <input
                type="file"
                class="hidden"
                accept="image/png,image/jpeg,image/jpg"
                @change="handleLogoChange"
              />
            </label>
            <!-- ERROR -->
            <p v-if="logoError" class="text-red-500 text-sm font-semibold mt-3">
              {{ logoError }}
            </p>
            <!-- Estado Activo -->
            <div class="mt-8">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-slate-900 dark:text-white font-bold text-sm">
                    Tipo de Jugador
                  </p>
                  <p class="text-slate-500 text-xs">
                    Define si el jugador es titular o suplente
                  </p>
                </div>
                <label class="inline-flex items-center cursor-pointer">
                  <span class="select-none text-sm font-medium text-heading">Suplente</span>
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    :checked="isStarter === 'Titular'"
                    @change="isStarter = ($event.target as HTMLInputElement).checked ? 'Titular' : 'Suplente'"
                  />
                  <div class="relative mx-3 w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                  <span class="select-none text-sm font-medium text-heading">Titular</span>
                </label>
              </div>
            </div>
            <!-- Tipo de Jugador -->
            <div class="mt-5">
              <div class="flex flex-col gap-2">
                <div>
                  <p class="text-slate-900 dark:text-white font-bold text-sm">
                    Estado Activo
                  </p>
                  <p class="text-slate-500 text-xs">
                    Establecer disponibilidad del jugador
                  </p>
                </div>                
                <select
                  v-model="status"
                  class="w-full rounded border-slate-200 dark:border-slate-700 focus:ring-blue-700 focus:border-blue-700 bg-white dark:bg-slate-800 text-sm dark:text-white"
                >
                  <option value="Activo">Activo</option>
                  <option value="Lesionado">Lesionado</option>
                  <option value="Pendiente">Pendiente</option>
                </select>

                <p v-if="errors.status" class="text-red-500 text-sm font-semibold">
                  {{ errors.status }}
                </p>
              </div>
            </div>           
          </div>
        </div>
        <!-- Form Details Section -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Full Name -->
              <div class="col-span-2">
                <label
                  class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                >
                  Nombre Completo
                </label>
                <input
                  v-model="fullName"
                  class="w-full rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 dark:text-white text-sm"
                  placeholder="ej. Juan Martínez"
                  type="text"
                />
                <p v-if="errors.fullName" class="text-red-500 text-sm font-semibold">
                  {{ errors.fullName }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Edad <span class=" text-slate-400">(años)</span>
                </label>
                <input
                  v-model="age"
                  class="w-full rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 dark:text-white text-sm"
                  max="99"
                  min="1"
                  placeholder="7"
                  type="number"
                />
                <p v-if="errors.age" class="text-red-500 text-sm font-semibold">
                  {{ errors.age }}
                </p>
              </div>              
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">             
              <!-- Date of Birth -->
              <div>
                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Fecha de Nacimiento
                </label>
                <input
                  v-model="birthDate"
                  type="date"
                  class="w-full rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 dark:text-white text-sm"
                />
                <p v-if="errors.birthDate" class="text-red-500 text-sm font-semibold">
                  {{ errors.birthDate }}
                </p>
              </div>
              <!-- Nationality -->
              <div>
                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Ciudad o Municipio
                </label>
                <input
                  v-model="city"
                  class="w-full rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 dark:text-white text-sm"
                  placeholder="ej. Naranjos"
                  type="text"
                />

                <p v-if="errors.city" class="text-red-500 text-sm font-semibold">
                  {{ errors.city }}
                </p>
                <!-- <select
                  class="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary focus:ring-primary dark:text-white text-sm"
                >
                  <option value="">Seleccionar País</option>
                  <option value="PT">Portugal</option>
                  <option value="AR">Argentina</option>
                  <option value="BR">Brasil</option>
                  <option value="FR">Francia</option>
                  <option value="ES">España</option>
                </select> -->
              </div>
              <!-- Position -->
              <div>
                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Posición Principal
                </label>
                <select
                  v-model="position"
                  class="w-full rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 dark:text-white text-sm"
                >
                  <option value="Portero">Portero</option>
                  <option value="Defensa">Defensa</option>
                  <option value="Mediocampista">Mediocampista</option>
                  <option value="Delantero">Delantero</option>
                </select>
                <p v-if="errors.position" class="text-red-500 text-sm font-semibold">
                  {{ errors.position }}
                </p>
              </div>
              <!-- Jersey Number -->
              <div>
                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Dorsal
                </label>
                <input
                  v-model="number"
                  class="w-full rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 dark:text-white text-sm"
                  max="99"
                  min="1"
                  placeholder="7"
                  type="number"
                />
                <p v-if="errors.number" class="text-red-500 text-sm font-semibold">
                  {{ errors.number }}
                </p>                
              </div>
              <!-- Height -->
              <div>
                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Altura (cm)
                </label>
                <input
                  v-model="height"
                  class="w-full rounded border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 dark:text-white text-sm"
                  placeholder="185"
                  type="number"
                />
                <p v-if="errors.height" class="text-red-500 text-sm font-semibold">
                  {{ errors.height }}
                </p>
              </div>
              <!-- Weight -->
              <div>
                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Peso (kg)
                </label>
                <input
                  v-model="weight"
                  class="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary focus:ring-primary dark:text-white text-sm"
                  placeholder="80"
                  type="number"
                />
                <p v-if="errors.weight" class="text-red-500 text-sm font-semibold">
                  {{ errors.weight }}
                </p>                
              </div>

            </div>
            <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <p class="text-xs text-slate-500 italic">
                Al editar a este jugador, confirmas que cumple con todos los
                requisitos de elegibilidad de la liga y ha firmado las exenciones
                médicas necesarias.
              </p>
            </div>

          </div>
        </div>
      </form>

      <!-- Help Card -->
      <div
        class="mt-8 p-4 rounded-xl bg-blue-500/20 border border-blue-500/80 flex gap-4 items-start"
      >
        <FaIcon icon="fa-lightbulb" class="text-blue-500 text-lg"/>

        <div>
          <h4 class="text-sm font-bold text-blue-500">Consejo Profesional</h4>

          <p
            class="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed"
          >
            Asegúrate de que la imagen tenga una buena resolución para que se vea
            correctamente en las tablas de clasificación y en la plantilla del equipo. Se
            recomienda un formato cuadrado.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>