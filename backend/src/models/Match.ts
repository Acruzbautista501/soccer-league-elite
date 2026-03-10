import { Schema, model } from 'mongoose';
import type { IMatch } from '../interfaces/Calendar.js';

const matchSchema = new Schema<IMatch>({
  matchday: { type: Schema.Types.ObjectId, ref: 'Matchday', required: true },
  localTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  visitorTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  stadium: { type: String, required: true },
  localGoals: { type: Number, default: 0 },
  visitorGoals: { type: Number, default: 0 },
  status: { type: String, enum: ['Pendiente', 'Finalizado', 'Suspendido'], default: 'Pendiente' }
}, { timestamps: true });

export const Match = model<IMatch>('Match', matchSchema);