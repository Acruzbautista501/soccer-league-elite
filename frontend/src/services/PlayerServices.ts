import api from "@/api/api"
import type { ApiResponse } from "@/types/ApiResponse"
import type { Player } from "@/interfaces/Player"

export default {

  createPlayer(payload: FormData) {
    return api.post<ApiResponse<Player>>('/players/team/regitser', payload)
  },
}