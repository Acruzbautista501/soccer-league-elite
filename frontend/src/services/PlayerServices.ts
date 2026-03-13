import api from "@/api/api"
import type { ApiResponse } from "@/types/ApiResponse"
import type { Player } from "@/interfaces/Player"

export default {
  getplayer(id: string){
    return api.get<ApiResponse<Player>>(`/players/player/details/${id}`,)
  },
  createPlayer(payload: FormData) {
    return api.post<ApiResponse<Player>>('/players/team/register', payload)
  },
  updatePlayer(id: string, payload: FormData) {
    return api.put<ApiResponse<Player>>(`/players/player/update/${id}`, payload)
  }
}