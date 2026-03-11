import { Document, Types } from "mongoose";

export interface IPlayer extends Document {
  fullName: string;
  isStarter: 'Titular' | 'Suplente';
  number: number;
  age: number;
  position: 'Portero' | 'Defensa' | 'Mediocampista' | 'Delantero';
  status: 'Activo' | 'Lesionado' | 'Pendiente';
  team: Types.ObjectId; // Referencia al equipo
  city: string;
  birthDate: Date;
  height: number;
  weight: number;
  createdAt?: Date;
  updatedAt?: Date;  
}