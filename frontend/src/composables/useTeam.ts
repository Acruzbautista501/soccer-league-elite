import type { Team, CreateTeam, UpdateTeam } from "@/interfaces/Team";
import TeamsServices from "@/services/TeamsServices";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useThemedSwal } from "./useThemedSwal";

export const useTeam = () => {
  const router = useRouter()
  const { fire } = useThemedSwal()

  const teamService = TeamsServices
  const teams = ref<Team[]>([])

  const team = ref<Team>({
    _id: "",
    name: "",
    city: "",
    region: "",
    primaryColor: "",
    logoUrl: "",
    coach: "",
    contactEmail: "",
    delegate: "",
    status: ""
  })

  const createTeamForm = reactive<CreateTeam>({
    name: "",
    city: "",
    region: "",
    primaryColor: '#193CB8',
    logoUrl: "",
    coach: "",
    contactEmail: "",
    delegate: "", 
    status: "Activo"
  })

  const updateTeamForm = reactive<UpdateTeam>({
    _id: "",
    name: "",
    city: "",
    region: "",
    primaryColor: "",
    logoUrl: "",
    coach: "",
    contactEmail: "",
    delegate: "", 
    status: "Actiivo"
  })

  // Obtener los equipos de la liga
  const getTeams = async () => {
    try {
      const teamSoccer = teamService.getTeams()
      const { data: { data } } = await teamSoccer
      teams.value = data || []
      console.log(data)
    } catch (error: any) {
      fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudieron cargar los equipos.',
        icon: 'error'
      })
    }
  }

  // Obtener un equipo de la liga
  const getTeam = async (id: string) => {
    try {
      const teamLoad = await teamService.getTeam(id)
      const { data: { data } } = await teamLoad
      team.value = data || {}
    } catch (error: any) {
      fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo cargar el equipo.',
        icon: 'error'
      })
    }
  }

  // Agregar un nuevo equipo en la liga
  const addTeam = async (logo: File | null) => {
    try {

      const formData = new FormData()

      formData.append('name', createTeamForm.name)
      formData.append('city', createTeamForm.city)
      formData.append('region', createTeamForm.region)
      formData.append('primaryColor', createTeamForm.primaryColor)
      formData.append('coach', createTeamForm.coach)
      formData.append('contactEmail', createTeamForm.contactEmail)
      formData.append('delegate', createTeamForm.delegate)
      formData.append('status', createTeamForm.status)

      if (logo) {
        formData.append('logo', logo)
      }

      const { data } = await teamService.createTeam(formData)

      await fire({
        title: 'Equipo Agregado',
        text: data.message || 'El equipo ha sido agregado exitosamente.',
        icon: 'success'
      })

      await getTeams()

      router.push({
        name: 'Equipos'
      })

    } catch (error: any) {
      await fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo agregar el equipo.',
        icon: 'error'
      })
    }
  }

  // Editar equipo
  const updateTeam = async (logo: File | null) => {
    try {

      const formData = new FormData()

      formData.append('name', updateTeamForm.name)
      formData.append('city', updateTeamForm.city)
      formData.append('region', updateTeamForm.region)
      formData.append('primaryColor', updateTeamForm.primaryColor)
      formData.append('coach', updateTeamForm.coach)
      formData.append('contactEmail', updateTeamForm.contactEmail)
      formData.append('delegate', updateTeamForm.delegate)
      formData.append('status', updateTeamForm.status)

      if (logo) {
        formData.append('logo', logo)
      }

      const { data } = await teamService.updateTeam(updateTeamForm._id, formData)

      await fire({
        title: 'Equipo actualizado',
        text: data.message || 'La información del equipo se actualizó correctamente.',
        icon: 'success'
      })

      await getTeams()

      router.push({
        name: 'Equipos'
      })

    } catch (error: any) {
      await fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo actualizar el equipo.',
        icon: 'error'
      })
    }
  } 

  const deleteTeam = async (id: string) => {
    const confirm = await fire ({
      title: '¿Eliminar Equipo?',
      text: 'Da click en "Eliminar" si estás seguro de eliminar el equipo.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
    if(!confirm.isConfirmed) return

    try {
      const { data } = await teamService.deleteTeam(id)
      fire({
        title: 'Eliminado',
        text: data.message || 'El equipo ha sido eliminado correctamente.',
        icon: 'success'
      })
      await getTeams()
      router.push({
        name: 'Equipos'
      })

    } catch (error: any) {
      fire({
        title:'Error',
        text: error.response?.data?.message || 'No se pudo eliminar el equipo.',
        icon: 'error'
      })      
    }
  }

  return{
    teams,
    team,
    createTeamForm,
    updateTeamForm,

    getTeams,
    addTeam,
    getTeam,
    updateTeam,
    deleteTeam
  }
}