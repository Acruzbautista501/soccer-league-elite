import { Schema, model, Types } from 'mongoose';
import type { IMatchEvent } from '../interfaces/Calendar.js';

const matchEventSchema = new Schema<IMatchEvent>({
  match: { type: Types.ObjectId, ref: 'Match', required: true },
  team: { type: Types.ObjectId, ref: 'Team', required: true },
  player: { type: Types.ObjectId, ref: 'Player', required: true },
  type: { 
    type: String, 
    enum: ['Gol', 'Amarilla', 'Roja', 'Sustitución-Entra', 'Sustitución-Sale'], 
    required: true 
  },
  minute: { type: Number, required: true },
  details: { type: String } 
}, { timestamps: true });

export const MatchEvent = model<IMatchEvent>('MatchEvent', matchEventSchema);