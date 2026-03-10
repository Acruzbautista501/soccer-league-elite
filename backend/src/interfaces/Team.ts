import { Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  city: string;
  region: 'Zona Norte' | 'Zona Golfo';
  primaryColor: string;
  logoUrl: string;
  coach: string;
  contactEmail: string;
  delegate?: string;
  status: 'Activo' | 'Suspendido';
  createdAt?: Date;
  updatedAt?: Date;
}