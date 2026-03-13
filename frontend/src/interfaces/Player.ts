export interface CreatePlayer {
  fullName: string
  age: number
  photo: string
  number: number
  birthDate: string
  position: 'Portero' | 'Defensa' | 'Mediocampista' | 'Delantero'
  isStarter: 'Suplente' | 'Titular'
  status: 'Activo' | 'Lesionado' | 'Inactivo'
  team: string | Team
  city: string
  height: number
  weight: number
}

export interface Player extends CreatePlayer{
  _id: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UpdatePlayer extends CreatePlayer {
  _id: string
}

export interface Team {
  _id: string
  name: string
  city: string
  region: string
  primaryColor: string
  logoUrl: string
  coach: string
  contactEmail: string
  delegate: string
  status: string  
  createdAt?: Date
  updatedAt?: Date
}