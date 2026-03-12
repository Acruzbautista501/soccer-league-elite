export interface CreatePlayer {
  fullName: string
  number: number
  position: string
  isStarter: string
  status: string
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