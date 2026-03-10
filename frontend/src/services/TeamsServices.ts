import api from "@/api/api"
import type { ApiResponse } from "@/types/ApiResponse"
import type { Team } from "@/interfaces/Team"

export default {

  getTeams() {
    return api.get<ApiResponse<Team[]>>('/teams')
  },

  getTeam(id: string) {
    return api.get<ApiResponse<Team>>(`/teams/details/${id}`)
  },

  createTeam(payload: FormData) {
    return api.post<ApiResponse<Team>>('/teams/register', payload)
  },

  updateTeam(id: string, payload: FormData) {
    return api.put<ApiResponse<Team>>(`/teams/update/${id}`, payload)
  },

  toggleStatusTeamActive(id: string, status: string) {
    return api.patch<ApiResponse<Team>>(`/teams/toggle-status/${id}`, { status })
  },

  deleteTeam(id: string) {
    return api.delete<ApiResponse<null>>(`/teams/delete/${id}`)
  }
}