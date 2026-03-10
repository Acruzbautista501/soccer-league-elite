import { Router } from "express";
import { TeamController } from "../controllers/TeamController.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

 // Listar equipos filtrados por región
router.get('/', TeamController.getAll);

// Obtener un solo equipo por ID 
router.get('/details/:id', TeamController.getOne);

// Registrar nuevo equipo
router.post('/register', upload.single('logo'), TeamController.create);

// Actualizar datos del equipo
router.put('/update/:id', upload.single('logo'), TeamController.update);

// Cambiar estado (Activo/Suspendido)
router.patch('/toggle-status/:id', TeamController.toggleStatus);

// Eliminar un equipo
router.delete('/delete/:id', TeamController.delete);

// Obtener plantilla de un equipo
router.get('/:id/players', TeamController.getPlayers);

export default router;