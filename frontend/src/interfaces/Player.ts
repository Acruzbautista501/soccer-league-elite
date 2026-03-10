export interface Player {

  id?: string;

  nombre: string;
  apellidos: string;

  posicion:
    | "portero"
    | "defensa"
    | "mediocampista"
    | "delantero";

  dorsal: number;
  edad: number;
  nacionalidad: string;

  goles: number;
  asistencias: number;
  atajadas?: number;

  fotoUrl?: string;
}
