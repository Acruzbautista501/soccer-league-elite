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


