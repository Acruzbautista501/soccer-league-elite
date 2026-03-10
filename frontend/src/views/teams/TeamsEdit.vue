<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useTeam } from '@/composables/useTeam'
import { useRoute, useRouter } from 'vue-router'
import { getImageUrl } from '@/utils/getImage'

const route = useRoute()
const router = useRouter()

const { team,updateTeamForm, getTeam, updateTeam, deleteTeam } = useTeam()

const teamId = route.params.id as string

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
    name: z.string().min(3, 'El nombre debe tener mínimo 3 caracteres'),
    city: z.string().min(2, 'La ciudad o municipio es obligatorio'),
    zone: z.string().min(1, 'Selecciona una zona'),
    coach: z.string().min(3, 'El entrenador es obligatorio'),
    email: z.string().email('Email inválido'),
  })
)

const { handleSubmit, errors, defineField, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    city: '',
    zone: '',
    coach: '',
    email: ''
  }
})

// campos reactivos
const [name] = defineField('name')
const [city] = defineField('city')
const [zone] = defineField('zone')
const [coach] = defineField('coach')
const [email] = defineField('email')

// Agregar nuevo equipo
const editTeam = handleSubmit(async (values) => {

  updateTeamForm.name = values.name
  updateTeamForm.city = values.city
  updateTeamForm.region = values.zone
  updateTeamForm.coach = values.coach
  updateTeamForm.contactEmail = values.email

  await updateTeam(logoFile.value)
})

onMounted(async () => {
  await getTeam(teamId)

  setValues({
    name: team.value.name,
    city: team.value.city,
    zone: team.value.region,
    coach: team.value.coach,
    email: team.value.contactEmail
  })

  updateTeamForm._id = team.value._id
  updateTeamForm.delegate = team.value.delegate
  updateTeamForm.primaryColor = team.value.primaryColor

  // Cargar escudo existente
  if (team.value.logoUrl) {
    preview.value = getImageUrl(team.value.logoUrl)
  }
})
</script>

<template>
  <div class="flex-1 p-6 md:p-10">
    <div class="max-w-9xl mx-auto flex flex-col gap-8">
      <section class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-slate-900 dark:text-slate-100 text-3xl font-black tracking-tight">Editar Equipo</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Actualiza la información del equipo para la temporada actual.</p>
        </div>
        <button
          @click="router.back()" 
          class="flex items-center gap-2 px-4 py-2 text-lg font-medium border text-slate-600 dark:text-slate-400 border-slate-400 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          <FaIcon icon="fa-circle-arrow-left" class="text-xl"/>
          Volver
        </button>
      </section>
      <form
        class="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800"
       @submit.prevent="editTeam"
      >
        <!-- Section: Informacion General -->
        <div>
          <div
            class="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800"
          >
            <FaIcon icon="fa-circle-info" class="text-blue-800 text-2xl"/>
            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">Información General</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-800 dark:text-gray-100">Nombre del Equipo</label>
              <input
                v-model="name"
                type="text"
                placeholder="Ej: Los Galácticos FC"
                class="w-full rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 text-gray-800 dark:text-gray-100"
              />
              <p v-if="errors.name" class="text-red-500 text-sm font-semibold">
                {{ errors.name }}
              </p>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-800 dark:text-gray-100">Ciudad o Municipio</label>
              <input
                v-model="city"
                type="text"
                placeholder="Ej: Naranjos"
                class="w-full rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 text-gray-800 dark:text-gray-100"
              />
              <p v-if="errors.city" class="text-red-500 text-sm font-semibold">
                {{ errors.city }}
              </p>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-800 dark:text-gray-100">Zona</label>
              <select
                v-model="zone"
                class="w-full rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 text-gray-800 dark:text-gray-100"
              >
                <option value="" selected disabled>Selecciona una región</option>
                <option value="Zona Golfo">Zona Golfo</option>
                <option value="Zona Norte">Zona Norte</option>
              </select>
              <p v-if="errors.zone" class="text-red-500 text-sm font-semibold">
                {{ errors.zone }}
              </p>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-800 dark:text-gray-100">Color Principal</label>

              <div class="flex items-center gap-3">
                <input
                  v-model="updateTeamForm.primaryColor "
                  type="color"
                  class="h-10 w-16 p-1 rounded border-slate-300 dark:border-slate-700  dark:bg-slate-800 bg-transparent"
                />
                <span class="text-xs text-slate-500">
                  Identificador visual del equipo
                </span>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Escudo del Equipo
              </label>

              <div class="flex items-center justify-center w-full">
                <label
                  class="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded cursor-pointer bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-800 hover:bg-slate-100 dark:border-slate-700 transition-all"
                >

                  <!-- PREVIEW -->
                  <img
                    v-if="preview"
                    :src="preview"
                    class="h-20 w-20 object-contain"
                  />

                  <!-- ESTADO VACÍO -->
                  <div
                    v-else
                    class="flex flex-col items-center justify-center pt-5 pb-6"
                  >
                    <FaIcon icon="fa-image" class="text-slate-400 text-4xl mb-2" />

                    <p class="text-xs text-slate-500 dark:text-slate-400">
                      PNG, JPG o SVG (Máx. 2MB)
                    </p>
                  </div>

                  <input
                    type="file"
                    class="hidden"
                    accept="image/png,image/jpeg,image/svg+xml"
                    @change="handleLogoChange"
                  />
                </label>
              </div>

              <p v-if="logoError" class="text-red-500 text-sm font-semibold">
                {{ logoError }}
              </p>
            </div>
          </div>
        </div>

        <!-- Section: Personal Técnico -->
        <div>
          <div
            class="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800"
          >
            <FaIcon icon="fa-user-check" class="text-blue-800 text-2xl"/>
            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">Responsable del Equipo</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-800 dark:text-gray-100">Entrenador Principal o Responsable del Equipo</label>

              <div class="relative">                
                <FaIcon icon="fa-user" class="text-slate-400 text-lg absolute left-3 top-2.5"/>

                <input
                  v-model="coach"
                  type="text"
                  placeholder="Nombre completo"
                  class="w-full pl-10 rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 text-gray-800 dark:text-gray-100"
                />
              <p v-if="errors.coach" class="text-red-500 text-sm font-semibold">
                {{ errors.coach }}
              </p>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-800 dark:text-gray-100">Correo Electrónico de Contacto</label>

              <div class="relative">
                <FaIcon icon="fa-envelope" class="text-slate-400 text-lg absolute left-3 top-2.5"/>

                <input
                  v-model="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  class="w-full pl-10 rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 text-gray-800 dark:text-gray-100"
                />
                <p v-if="errors.email" class="text-red-500 text-sm font-semibold">
                  {{ errors.email }}
                </p>                
              </div>
            </div>

            <div class="flex flex-col gap-2 col-span-1 md:col-span-2">
              <label class="text-sm font-semibold text-gray-800 dark:text-gray-100">Asignar Delegado <span class="text-slate-500 font-light dark:text-slate-400">(opcional)</span></label>

                <input
                  v-model="updateTeamForm.delegate"
                  type="text"
                  placeholder="Ej: Juan Peréz"
                  class="w-full rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 text-gray-800 dark:text-gray-100"
                />

              <p
                class="text-2xs text-slate-400 uppercase tracking-wider font-bold mt-1"
              >
                El delegado gestionará las actas de los partidos.
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800"
        >
          <button
            type="button"
            class="px-8 py-3 text-sm font-bold text-white bg-red-600 dark:bg-red-500 hover:bg-red-500/90 dark:hover:bg-red-500/90   rounded shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
            @click="deleteTeam(teamId)"
          >
            <FaIcon icon="fa-delete-left" class="text-white text-lg"/>
            Eliminar Equipo
          </button>
          <div class="flex items-center gap-4">

            <button
              type="button"
              class="px-6 py-3 text-sm font-bold text-slate-600 border border-blue-500/80 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-all"
            >
              <FaIcon icon="fa-ban" class="text-blue-500 text-lg"/>
              Cancelar
            </button>

            <button
              type="submit"
              class="px-8 py-3 text-sm font-bold text-white bg-blue-800 hover:bg-blue-600/90 rounded shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
            >
              <FaIcon icon="fa-pen-to-square" class="text-white text-lg"/>
              Editar Equipo
            </button>
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
            Asegúrate de que el escudo tenga una buena resolución para que se vea
            correctamente en las tablas de clasificación y perfiles de partido. Se
            recomienda un formato cuadrado.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>