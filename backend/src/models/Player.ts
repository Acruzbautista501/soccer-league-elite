import { Schema, model } from 'mongoose'
import type { IPlayer } from '../interfaces/Player.js'

const playerSchema = new Schema<IPlayer>({
  fullName: { type: String, required: true },
  age: { type: Number, required: true},
  photo: { type: String, required: true },
  isStarter: { 
    type: String,
    enum: [ 'Titular', 'Suplente' ],
    required: true,
  },
  number: { type: Number, required: true },
  position: { 
    type: String, 
    enum: ['Portero', 'Defensa', 'Mediocampista', 'Delantero'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Activo', 'Lesionado', 'Inactivo'], 
    default: 'Activo' 
  },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  city: { type: String },
  birthDate: { type: Date },
  height: { type: Number },
  weight: { type: Number }
}, { timestamps: true });

export const Player = model<IPlayer>('Player', playerSchema);