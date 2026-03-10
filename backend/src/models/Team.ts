import { Schema, model } from 'mongoose'
import type { ITeam } from '../interfaces/Team.js'

const teamSchema = new Schema<ITeam>(
{
  name: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, enum: ['Zona Golfo', 'Zona Norte'], required: true },
  primaryColor: { type: String, required: true },
  logoUrl: { type: String, required: true },
  coach: { type: String, required: true },
  contactEmail: { type: String, required: true },
  delegate: { type: String },
  status: { type: String, enum: ['Activo', 'Suspendido'], default: 'Activo' }
},
{ timestamps: true }
)

export const Team = model<ITeam>('Team', teamSchema)