import { Document, Types } from "mongoose";

export interface IPlayer extends Document {
  fullName: string;
  photo: string;
  isStarter: 'Suplente' | 'Titular';
  number: number;
  age: number;
  position: 'Portero' | 'Defensa' | 'Mediocampista' | 'Delantero';
  status: 'Activo' | 'Lesionado' | 'Inactivo';
  team: Types.ObjectId; // Referencia al equipo
  city: string;
  birthDate: Date;
  height: number;
  weight: number;
  createdAt?: Date;
  updatedAt?: Date;  
}