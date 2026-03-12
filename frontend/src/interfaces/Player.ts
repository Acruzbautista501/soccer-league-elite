export interface CreatePlayer {
  fullName: string
  age: number
  birthDate: string
  number: number
  position: 'Portero' | 'Defensa' | 'Mediocampista' | 'Delantero'
  isStarter: 'Suplente' | 'Titular'
  status: 'Activo' | 'Lesionado' | 'Inactivo'
  team: string
  city: string
  height: number
  weight: number
}

export interface Player extends CreatePlayer{
  _id: string
  createdAt?: Date
  updatedAt?: Date
}