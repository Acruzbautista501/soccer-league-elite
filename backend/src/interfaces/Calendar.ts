import { Document, Types } from 'mongoose';

export interface IMatchday extends Document {
  number: number;
  region: 'Zona Golfo' | 'Zona Norte';
  startDate: Date;
  endDate: Date;
  status: 'Programada' | 'En Curso' | 'Finalizada';
}

export interface IMatch extends Document {
  matchday: Types.ObjectId;
  localTeam: Types.ObjectId;
  visitorTeam: Types.ObjectId;
  date: Date;
  time: string;
  stadium: string;
  localGoals: number;
  visitorGoals: number;
  status: 'Pendiente' | 'Finalizado' | 'Suspendido';
}

export type EventType = 'Gol' | 'Amarilla' | 'Roja' | 'Sustitución-Entra' | 'Sustitución-Sale';

export interface IMatchEvent extends Document {
  match: Types.ObjectId;
  team: Types.ObjectId;
  player: Types.ObjectId;
  type: EventType;
  minute: number;
  details?: string;
  createdAt?: Date;
  updatedAt?: Date;
}