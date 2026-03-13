import { Router } from "express";
import { TeamController } from "../controllers/TeamController.js";
import { createUploader } from "../middlewares/upload.js";

const router = Router();
const uploadTeam = createUploader('teams')

 // Listar equipos filtrados por región
router.get('/', TeamController.getAll);

// Obtener un solo equipo por ID 
router.get('/details/:id', TeamController.getOne);

// Registrar nuevo equipo
router.post('/register', uploadTeam.single('logo'), TeamController.create);

// Actualizar datos del equipo
router.put('/update/:id', uploadTeam.single('logo'), TeamController.update);

// Cambiar estado (Activo/Suspendido)
router.patch('/toggle-status/:id', TeamController.toggleStatus);

// Eliminar un equipo
router.delete('/delete/:id', TeamController.delete);

// Obtener plantilla de un equipo
router.get('/:id/players', TeamController.getPlayers);

export default router;