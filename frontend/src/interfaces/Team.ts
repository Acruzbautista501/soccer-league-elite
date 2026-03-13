export interface CreateTeam {
  name: string
  city: string
  region: string
  primaryColor: string
  logoUrl: string
  coach: string
  contactEmail: string
  delegate: string
  status: string
}

export interface Team extends CreateTeam {
  _id: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UpdateTeam extends CreateTeam {
  _id: string
} 

export interface Player {
  _id?: string
  fullName: string
  age: number
  photo: string
  number: number
  position: 'Portero' | 'Defensa' | 'Mediocampista' | 'Delantero'
  isStarter: 'Suplente' | 'Titular'
  status: 'Activo' | 'Lesionado' | 'Inactivo'
  team: string
  city: string
  height: number
  weight: number
  createdAt?: Date
  updatedAt?: Date
}

export interface TeamPlayersResponse {
  team: Team
  players: Player[]
}

