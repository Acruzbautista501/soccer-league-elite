import type{ Request, Response } from 'express';
import { Player } from '../models/Player.js';
import mongoose from 'mongoose';

interface TeamParams {
  teamId: string
}

export const PlayerController = {
  // Obtener todos los jugadores de un equipo (Plantilla)
  async getByTeam(req: Request<TeamParams>, res: Response) {
    try {
      const { teamId } = req.params
      if (!teamId || !mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).json({ message: 'ID de equipo inválido' })
      }
      const players = await Player
        .find({ team: new mongoose.Types.ObjectId(teamId) })
        .populate('team')
        .sort({ number: 1 })
      res.status(200).json(players)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la plantilla', error })
    }
  },

  // Obtener un solo jugador por ID
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const player = await Player.findById(id).populate('team');
      if (!player) return res.status(404).json({ message: 'Jugador no encontrado' });
      res.status(200).json(player);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el jugador', error });
    }
  },

  // Registrar un nuevo jugador
  async create(req: Request, res: Response) {
    try {
      const newPlayer = new Player(req.body);
      const savedPlayer = await newPlayer.save();
      res.status(201).json(savedPlayer);
    } catch (error) {
      res.status(400).json({ message: 'Error al registrar el jugador', error });
    }
  },

  // Actualizar un jugador
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedPlayer = await Player.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedPlayer) return res.status(404).json({ message: 'Jugador no encontrado' });
      res.status(200).json(updatedPlayer);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el jugador', error });
    }
  },

  // Eliminar jugador
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedPlayer = await Player.findByIdAndDelete(id);
      if (!deletedPlayer) return res.status(404).json({ message: 'Jugador no encontrado' });
      res.status(200).json({ message: 'Jugador eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar jugador', error });
    }
  }
};