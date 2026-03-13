import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useThemedSwal } from "./useThemedSwal";
import type { CreatePlayer } from "@/interfaces/Player";
import PlayerServices from "@/services/PlayerServices";
import { objectToFormData } from "@/utils/getImage";

export const usePlayer = () => {
  const router = useRouter()
  const { fire } = useThemedSwal()


  const playerService = PlayerServices
  // const teams = ref<Team[]>([])

  // const team = ref<Team>({
  //   _id: "",
  //   name: "",
  //   city: "",
  //   region: "",
  //   primaryColor: "",
  //   logoUrl: "",
  //   coach: "",
  //   contactEmail: "",
  //   delegate: "",
  //   status: ""
  // })

  // const teamPlayer = ref<Player[]>([])

  const createPlayerForm = reactive<CreatePlayer>({
    fullName: "",
    number: 0,
    position: "Portero",
    isStarter: "Suplente",
    status: "Activo",
    team: "",
    city: "",
    height: 0,
    weight: 0,
    age: 0,
    birthDate: '',
  })

  // const updateTeamForm = reactive<UpdateTeam>({
  //   _id: "",
  //   name: "",
  //   city: "",
  //   region: "",
  //   primaryColor: "",
  //   logoUrl: "",
  //   coach: "",
  //   contactEmail: "",
  //   delegate: "", 
  //   status: "Actiivo"
  // })

  // Obtener los equipos de la liga
  // const getTeams = async () => {
  //   try {
  //     const teamSoccer = teamService.getTeams()
  //     const { data: { data } } = await teamSoccer
  //     teams.value = data || []
  //     console.log(data)
  //   } catch (error: any) {
  //     fire({
  //       title: 'Error',
  //       text: error.response?.data?.message || 'No se pudieron cargar los equipos.',
  //       icon: 'error'
  //     })
  //   }
  // }

  // Obtener un equipo de la liga
  // const getTeam = async (id: string) => {
  //   try {
  //   const { data: { data } } = await teamService.getTeam(id)
  //   team.value = data
  //   } catch (error: any) {
  //     fire({
  //       title: 'Error',
  //       text: error.response?.data?.message || 'No se pudo cargar el equipo.',
  //       icon: 'error'
  //     })
  //   }
  // }

  // const getPlayersTeam = async (id: string) => {
  //   try {

  //     const response = await teamService.getPlayersTeam(id)

  //     const { team: teamData, players } = response.data.data

  //     team.value = teamData
  //     teamPlayer.value = players

  //   } catch (error: any) {
  //     fire({
  //       title: 'Error',
  //       text: error.response?.data?.message || 'No se pudieron cargar los jugadores del equipo.',
  //       icon: 'error'
  //     })
  //   }
  // }

  // Agregar un nuevo equipo en la liga
  const addPlayer = async (photo: File | null) => {
    try {
      const formData = objectToFormData(createPlayerForm, {
        photo
      })
      const { data } = await playerService.createPlayer(formData)
      await fire({
        title: 'Jugador agregado',
        text: data.message || 'El jugador ha sido agregado exitosamente.',
        icon: 'success'
      })
      router.push({
        name: 'PlantillaEquipo'
      })

    } catch (error: any) {
      await fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo agregar el jugador.',
        icon: 'error'
      })

    }
  }

  // Editar equipo
  // const updateTeam = async (logo: File | null) => {
  //   try {

  //     const formData = new FormData()

  //     formData.append('name', updateTeamForm.name)
  //     formData.append('city', updateTeamForm.city)
  //     formData.append('region', updateTeamForm.region)
  //     formData.append('primaryColor', updateTeamForm.primaryColor)
  //     formData.append('coach', updateTeamForm.coach)
  //     formData.append('contactEmail', updateTeamForm.contactEmail)
  //     formData.append('delegate', updateTeamForm.delegate)
  //     formData.append('status', updateTeamForm.status)

  //     if (logo) {
  //       formData.append('logo', logo)
  //     }

  //     const { data } = await teamService.updateTeam(updateTeamForm._id, formData)

  //     await fire({
  //       title: 'Equipo actualizado',
  //       text: data.message || 'La información del equipo se actualizó correctamente.',
  //       icon: 'success'
  //     })

  //     await getTeams()

  //     router.push({
  //       name: 'Equipos'
  //     })

  //   } catch (error: any) {
  //     await fire({
  //       title: 'Error',
  //       text: error.response?.data?.message || 'No se pudo actualizar el equipo.',
  //       icon: 'error'
  //     })
  //   }
  // } 

  // const deleteTeam = async (id: string) => {
  //   const confirm = await fire ({
  //     title: '¿Eliminar Equipo?',
  //     text: 'Da click en "Eliminar" si estás seguro de eliminar el equipo.',
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: 'Eliminar',
  //     cancelButtonText: 'Cancelar'
  //   })
  //   if(!confirm.isConfirmed) return

  //   try {
  //     const { data } = await teamService.deleteTeam(id)
  //     fire({
  //       title: 'Eliminado',
  //       text: data.message || 'El equipo ha sido eliminado correctamente.',
  //       icon: 'success'
  //     })
  //     await getTeams()
  //     router.push({
  //       name: 'Equipos'
  //     })

  //   } catch (error: any) {
  //     fire({
  //       title:'Error',
  //       text: error.response?.data?.message || 'No se pudo eliminar el equipo.',
  //       icon: 'error'
  //     })      
  //   }
  // }

  return{
    // teams,
    // team,
    // teamPlayer,
    createPlayerForm,
    // updateTeamForm,

    // getTeams,
    // getPlayersTeam,
    addPlayer,
    // getTeam,
    // updateTeam,
    // deleteTeam
  }
}