import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useThemedSwal } from "./useThemedSwal";
import type { CreatePlayer, Player, UpdatePlayer } from "@/interfaces/Player";
import PlayerServices from "@/services/PlayerServices";
import { objectToFormData } from "@/utils/getImage";
import type { UpdateTeam } from "@/interfaces/Team";

export const usePlayer = () => {
  const router = useRouter()
  const { fire } = useThemedSwal()


  const playerService = PlayerServices

  const player = ref<Player>({
    _id: "",
    fullName: "",
    age: 0,
    birthDate: "",
    number: 0,
    position: "Portero",
    isStarter: "Suplente",
    status: "Activo",
    team: "",
    city: "",
    height: 0,
    weight: 0,
    photo: ""
  })

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
    photo: ""
  })

  const updatePlayerForm = reactive<UpdatePlayer>({
    _id: "",
    fullName: "",
    age: 0,
    birthDate: "",
    number: 0,
    position: "Portero",
    isStarter: "Suplente",
    status: "Activo",
    team: "",
    city: "",
    height: 0,
    weight: 0,
    photo: ""
  })

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
  const getPlayer = async (id: string) => {
    try {
    const { data: { data } } = await playerService.getplayer(id)
    player.value = data
    } catch (error: any) {
      fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo cargar el equipo.',
        icon: 'error'
      })
    }
  }

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
  const updatePlayer = async (photo: File | null) => {
    try {
      const formData = objectToFormData(updatePlayerForm, {
        photo
      })

      const { data } = await playerService.updatePlayer(updatePlayerForm._id, formData)

      await fire({
        title: 'Equipo actualizado',
        text: data.message || 'La información del equipo se actualizó correctamente.',
        icon: 'success'
      })

      // await getTeams()

      router.push({
        name: 'PlantillaEquipo'
      })

    } catch (error: any) {
      await fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo actualizar el equipo.',
        icon: 'error'
      })
    }
  } 

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
    player,
    // teamPlayer,
    createPlayerForm,
    updatePlayerForm,
    // updateTeamForm,

    // getTeams,
    getPlayer,
    addPlayer,
    // getTeam,
    updatePlayer,
    // deleteTeam
  }
}