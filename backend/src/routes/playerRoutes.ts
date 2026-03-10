import { Router } from "express";
import { PlayerController } from "../controllers/PlayerController.js";

const router = Router();

// Endpoints para Jugadores

// Obtener todos los jugadores de un equipo (Plantilla)
router.get('/team/:teamId', PlayerController.getByTeam);

// Obtener un solo jugador por ID
router.get('/details/:id', PlayerController.getOne);

// Registrar un nuevo jugador
router.post('/add', PlayerController.create);

// Actualizar un jugador
router.put('/update/:id', PlayerController.update); 

// Eliminar jugador
router.delete('/delete/:id', PlayerController.delete);   // Eliminar

export default router;