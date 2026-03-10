import type { Request, Response } from 'express';
import { Matchday } from '../models/Matchday.js';
import { Match } from '../models/Match.js';

export const CalendarController = {
  // JORNADAS

  // Obtener TODAS las jornadas con sus partidos (Filtro opcional por región)
  async getAllMatchdays(req: Request, res: Response) {
    try {
      const { region } = req.query;
      const filter = region ? { region } : {};

      // Buscamos jornadas y usamos populate para traer sus partidos asociados
      const matchdays = await Matchday.find(filter)
        .sort({ number: 1 })
        .populate({
          path: 'matches',
          populate: { path: 'localTeam visitorTeam', select: 'name logoUrl' } // También traemos datos de los equipos
        });

      res.status(200).json(matchdays);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las jornadas', error });
    }
  }, 
  
  // Obtener una jornada específica por ID con sus partidos
  async getMatchday(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const matchday = await Matchday.findById(id).populate({
        path: 'matches',
        populate: { path: 'localTeam visitorTeam', select: 'name logoUrl' }
      });

      if (!matchday) return res.status(404).json({ message: 'Jornada no encontrada' });
      
      res.json(matchday);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar nueva jornada
  async createMatchday(req: Request, res: Response) {
    try {
      const newMatchday = new Matchday(req.body);
      await newMatchday.save();
      res.status(201).json(newMatchday);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear jornada', error });
    }
  },

  // Actualizar jornada 
  async updateMatchday(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedMatchday = await Matchday.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
      );
      if (!updatedMatchday) {
        return res.status(404).json({ message: 'Jornada no encontrada' });
      }
      res.status(200).json(updatedMatchday);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar la jornada', error });
    }
  },

  // --- PARTIDOS ---

  // Obtener todos los partidos (con opción a filtrar por jornada o equipo)
  async getAllMatches(req: Request, res: Response) {
    try {
      // Opcional: permitir filtros por query params (ej: ?matchday=ID)
      const { matchday } = req.query;
      const filter = matchday ? { matchday } : {};

      const matches = await Match.find(filter)
        .populate('localTeam visitorTeam')
        .populate('matchday') // También traemos la info de la jornada
        .sort({ date: 1, time: 1 }); // Ordenados por fecha y hora

      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la lista de partidos', error });
    }
  },

   // Obtener un partido específico con datos de los equipos
  async getMatch(req: Request, res: Response) {
    try {
      const match = await Match.findById(req.params.id)
        .populate('localTeam visitorTeam'); // Trae el nombre y logo de los equipos
        
      if (!match) return res.status(404).json({ message: 'Partido no encontrado' });
      res.status(200).json(match);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener detalles del partido', error });
    }
  },
 

  // Programar un nuevo partido (Vinculado a una jornada)
  async createMatch(req: Request, res: Response) {
    try {
      const newMatch = new Match(req.body);
      await newMatch.save();
      // Opcional: populate para devolver el objeto completo al frontend
      const populatedMatch = await newMatch.populate('localTeam visitorTeam');
      res.status(201).json(populatedMatch);
    } catch (error) {
      res.status(400).json({ message: 'Error al programar partido', error });
    }
  },

  // Actualizar un partido (Resultado o Programación)
  async updateMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const updatedMatch = await Match.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true } // Validación obligatoria para evitar datos corruptos
      ).populate('localTeam visitorTeam');
      
      if (!updatedMatch) {
        return res.status(404).json({ message: 'Partido no encontrado' });
      }
      
      res.status(200).json(updatedMatch);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el partido', error });
    }
  },

  // --- VISTA CALENDARIO (Filtro por Jornada y Región) ---

  async getCalendar(req: Request, res: Response) {
    try {
      const { region, matchdayNumber } = req.query;
      
      // Buscamos la jornada específica
      const matchday = await Matchday.findOne({ 
        region: region as string, 
        number: Number(matchdayNumber) 
      });

      if (!matchday) return res.status(200).json({ matchday: null, matches: [] });

      // Buscamos los partidos de esa jornada
      const matches = await Match.find({ matchday: matchday._id })
        .populate('localTeam visitorTeam')
        .sort({ date: 1, time: 1 });

      res.json({ matchday, matches });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};