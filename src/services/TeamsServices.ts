import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import type { Team } from '../interfaces/Team';
import type { Player } from '../interfaces/Player';

export async function createTeam(
  ligaId: string,
  team: Team
): Promise<void> {

  await addDoc(
    collection(db, `ligas/${ligaId}/equipos`),
    team
  );
}

export async function getTeams(
  ligaId: string
): Promise<Team[]> {

  const snapshot = await getDocs(
    collection(db, `ligas/${ligaId}/equipos`)
  );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Team)
  }));
}

export async function updateTeam(
  ligaId: string,
  teamId: string,
  data: Partial<Team>
) {

  await updateDoc(
    doc(db, `ligas/${ligaId}/equipos/${teamId}`),
    data
  );
}

export async function deleteTeam(
  ligaId: string,
  teamId: string
): Promise<void> {

  await deleteDoc(
    doc(db, `ligas/${ligaId}/equipos/${teamId}`)
  );
}

export async function createPlayer(
  ligaId: string,
  teamId: string,
  jugador: Player
) {

  await addDoc(
    collection(
      db,
      `ligas/${ligaId}/equipos/${teamId}/jugadores`
    ),
    jugador
  );
}

export function listenTeams(ligaId: string, callback: (teams: Team[]) => void) {
  return onSnapshot(
    collection(db, `ligas/${ligaId}/equipos`),
    snap => {
      console.log("Documentos encontrados:", snap.size); // <--- Agrega esto
      const teams = snap.docs.map(doc => {
        console.log("Datos del equipo:", doc.data()); // <--- Y esto
        return {
          id: doc.id,
          ...(doc.data() as Team)
        }
      });
      callback(teams);
    }
  );
}


