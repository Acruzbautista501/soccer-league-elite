import type { Request, Response } from 'express';
import { MatchEvent } from '../models/MatchEvent.js';
import mongoose from 'mongoose'
import { Match } from '../models/Match.js';

interface MatchParams {
  matchId: string
}

export const ReportController = {
  
  // Obtener todos los eventos de un partido (Para el modal principal de reporte)
async getMatchReport(req: Request<MatchParams>, res: Response) {
  try {
    const { matchId } = req.params

    if (!matchId) {
      return res.status(400).json({ message: 'matchId es requerido' })
    }

    const events = await MatchEvent.find({
      match: new mongoose.Types.ObjectId(matchId)
    })
      .populate('team', 'name')
      .populate('player', 'fullName number')
      .sort({ minute: 1 })

    res.status(200).json(events)

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reporte', error })
  }
},

  // Registrar Múltiples Goles
  async addMultipleGoals(req: Request, res: Response) {
    try {
      // Esperamos un array de goles: [{ match, team, player, minute, goalType }, ...]
      const goals = req.body; 

      if (!Array.isArray(goals) || goals.length === 0) {
        return res.status(400).json({ message: 'Se esperaba un arreglo de goles' });
      }

      // Mapeamos los datos al formato que espera nuestro modelo MatchEvent
      const eventData = goals.map(goal => ({
        match: goal.match,
        team: goal.team,
        player: goal.player,
        type: 'Gol',
        minute: goal.minute,
        details: goal.goalType
      }));

      // Usamos insertMany para una operación atómica y eficiente
      const savedEvents = await MatchEvent.insertMany(eventData);

      // Poblamos los datos de los jugadores para devolverlos completos al frontend
      const populatedEvents = await MatchEvent.populate(savedEvents, {
        path: 'player',
        select: 'fullName number'
      });

      res.status(201).json(populatedEvents);
    } catch (error) {
      res.status(400).json({ message: 'Error al registrar múltiples goles', error });
    }
  },

  // Registrar Múltiples Tarjetas
  async addMultipleCards(req: Request, res: Response) {
    try {
      // Esperamos un array de tarjetas: [{ match, team, player, type, minute, details }, ...]
      const cards = req.body;

      if (!Array.isArray(cards) || cards.length === 0) {
        return res.status(400).json({ message: 'Se esperaba un arreglo de tarjetas' });
      }

      // Validar que todos los tipos de tarjeta sean válidos antes de insertar
      const validTypes = ['Amarilla', 'Roja'];
      const hasInvalidType = cards.some(card => !validTypes.includes(card.type));
      
      if (hasInvalidType) {
        return res.status(400).json({ message: 'Uno de los tipos de tarjeta es inválido' });
      }

      // Insertamos todas las tarjetas en una sola operación
      const savedEvents = await MatchEvent.insertMany(cards);

      res.status(201).json({
        message: 'Tarjetas registradas correctamente',
        count: savedEvents.length,
        events: savedEvents
      });
    } catch (error) {
      res.status(400).json({ message: 'Error al registrar múltiples tarjetas', error });
    }
  },

  // Registrar Múltiples Sustituciones
  async addMultipleSubstitutions(req: Request, res: Response) {
    try {
      // Esperamos un array: [{ match, team, playerOut, playerIn, minute }, ...]
      const substitutions = req.body;

      if (!Array.isArray(substitutions) || substitutions.length === 0) {
        return res.status(400).json({ message: 'Se esperaba un arreglo de sustituciones' });
      }

      // Preparamos el array plano de eventos (2 eventos por cada sustitución)
      const eventData = substitutions.flatMap(sub => [
        {
          match: sub.match,
          team: sub.team,
          player: sub.playerOut,
          type: 'Sustitución-Sale',
          minute: sub.minute,
          details: `Sustituido por ${sub.playerIn}`
        },
        {
          match: sub.match,
          team: sub.team,
          player: sub.playerIn,
          type: 'Sustitución-Entra',
          minute: sub.minute,
          details: `Entra por ${sub.playerOut}`
        }
      ]);

      // Insertamos todos los eventos (2 * N registros) en una sola operación
      const savedEvents = await MatchEvent.insertMany(eventData);

      res.status(201).json({
        message: 'Sustituciones registradas correctamente',
        count: savedEvents.length,
        events: savedEvents
      });
    } catch (error) {
      res.status(400).json({ message: 'Error al registrar múltiples sustituciones', error });
    }
  },

  // Eliminar cualquier evento
  async deleteEvent(req: Request, res: Response) {
    try {
      await MatchEvent.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar evento', error });
    }
  },

  // --- Finalizar Cédula Arbitral ---
  async finalizeMatchReport(req: Request, res: Response) {
    try {
      const { matchId } = req.params;
      const { localGoals, visitorGoals } = req.body;

      // 1. Actualizar el estado del partido a 'Finalizado' y guardar el marcador final
      const updatedMatch = await Match.findByIdAndUpdate(
        matchId,
        { 
          status: 'Finalizado',
          localGoals: localGoals,
          visitorGoals: visitorGoals 
        },
        { new: true }
      );

      if (!updatedMatch) {
        return res.status(404).json({ message: 'Partido no encontrado' });
      }

      res.status(200).json({ 
        message: 'Cédula finalizada con éxito', 
        match: updatedMatch 
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al finalizar la cédula', error });
    }
  }
};