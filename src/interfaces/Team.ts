export interface Team {

  id?: string;

  nombre: string;
  ciudad: string;

  region: "Norte" | "Golfo";

  colorPrincipal: string;

  escudoUrl?: string;

  estado: boolean;

  entrenador: Entrenador

  delegadoId?: string;

  createdAt?: any;
}

export interface Entrenador {
  email: string
  nombre: string
}


