import { Router } from "express";
import { CalendarController } from "../controllers/CalendarController.js";
import { ReportController } from "../controllers/ReportController.js";

const router = Router();

// Rutas de Jornadas

// Obtener TODAS las jornadas con sus partidos
router.get('/matchdays', CalendarController.getAllMatchdays);

// Obtener una jornada específica por ID con sus partidos
router.get('/matchday/:id', CalendarController.getMatchday);

// Registrar nueva jornada
router.post('/matchday/create', CalendarController.createMatchday);

// Actualizar jornada 
router.put('/matchday/update/:id', CalendarController.updateMatchday);



// Rutas de Partidos

// Obtener todos los partidos
router.get('/', CalendarController.getAllMatches);

// Obtener un partido específico con datos de los equipos
router.get('/match/:id', CalendarController.getMatch);

// Programar un nuevo partido (Vinculado a una jornada)
router.post('/match/schedule', CalendarController.createMatch);

// Actualizar un partido (Resultado o Programación)
router.put('/match/update/:id', CalendarController.updateMatch);

// Vista por filtro (Query Params)
router.get('/view', CalendarController.getCalendar);


// Obtener todo el historial de eventos de un partido (Para llenar el modal principal del reporte)
router.get('/:matchId', ReportController.getMatchReport);

// --- Endpoints para los Modales ---

// Registrar un gol
router.post('/add-goal', ReportController.addMultipleGoals);

// Registrar una tarjeta (Amarilla o Roja)
router.post('/add-card', ReportController.addMultipleCards);

// Registrar una sustitución
router.post('/add-substitution', ReportController.addMultipleSubstitutions);

// Eliminar un evento (En caso de corrección por parte del árbitro)
router.delete('/delete-event/:id', ReportController.deleteEvent);

export default router;