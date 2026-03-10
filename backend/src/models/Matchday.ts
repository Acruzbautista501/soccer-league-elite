import { Schema, model } from 'mongoose';
import type { IMatchday } from '../interfaces/Calendar.js';

const matchdaySchema = new Schema<IMatchday>({
  number: { type: Number, required: true },
  region: { type: String, enum: ['Zona Golfo', 'Zona Norte'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Programada', 'En Curso', 'Finalizada'], default: 'Programada' }
}, { 
  timestamps: true,
  toJSON: { virtuals: true }, // Asegura que los virtuals aparezcan en res.json()
  toObject: { virtuals: true } 
});

// Definición de la relación virtual
matchdaySchema.virtual('matches', {
  ref: 'Match',         // El nombre del modelo a vincular
  localField: '_id',    // El campo en este modelo (Matchday)
  foreignField: 'matchday' // El campo en el otro modelo (Match) que hace referencia a este
});

export const Matchday = model<IMatchday>('Matchday', matchdaySchema);