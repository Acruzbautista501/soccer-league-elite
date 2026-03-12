import type { Request, Response } from 'express'
import { Player } from '../models/Player.js'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'

interface TeamParams {
  teamId: string
}

export type PlayerIdRequest = Request<{ id: string }>


export const PlayerController = {

  // Obtener todos los jugadores de un equipo
  async getByTeam(req: Request<TeamParams>, res: Response) {
    try {

      const { teamId } = req.params

      if (!teamId || !mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).json({
          success: false,
          message: 'ID de equipo inválido'
        })
      }

      const players = await Player
        .find({ team: new mongoose.Types.ObjectId(teamId) })
        .populate('team')
        .sort({ number: 1 })

      return res.status(200).json({
        success: true,
        data: players
      })

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: 'Error al obtener la plantilla'
      })

    }
  },


  // Obtener un jugador
  async getOne(req: PlayerIdRequest, res: Response) {
    try {

      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de jugador inválido'
        })
      }

      const player = await Player.findById(id).populate('team')

      if (!player) {
        return res.status(404).json({
          success: false,
          message: 'Jugador no encontrado'
        })
      }

      return res.status(200).json({
        success: true,
        data: player
      })

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: 'Error al obtener el jugador'
      })

    }
  },


  // Crear jugador
  async create(req: Request, res: Response) {
    try {

      let playerData: any = { ...req.body }

      if (req.file) {
        playerData.photo = `/uploads/players/${req.file.filename}`
      }

      const newPlayer = new Player(playerData)

      const savedPlayer = await newPlayer.save()

      return res.status(201).json({
        success: true,
        message: 'Jugador registrado correctamente.',
        data: savedPlayer
      })

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: 'Error al registrar el jugador.'
      })

    }
  },

  // Actualizar jugador
  async update(req: PlayerIdRequest, res: Response) {
    try {

      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de jugador inválido'
        })
      }

      let updateData: any = { ...req.body }

      if (req.file) {

        const player = await Player.findById(id)

        if (player?.photo) {

          const oldPath = path.join(process.cwd(), player.photo)

          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
          }

        }

        updateData.photo = `/uploads/players/${req.file.filename}`
      }

      const updatedPlayer = await Player.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      )

      if (!updatedPlayer) {
        return res.status(404).json({
          success: false,
          message: 'Jugador no encontrado'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Jugador actualizado correctamente.',
        data: updatedPlayer
      })

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: 'Error al actualizar el jugador'
      })

    }
  },


  // Eliminar jugador
  async delete(req: PlayerIdRequest, res: Response) {
    try {

      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de jugador inválido'
        })
      }

      const player = await Player.findById(id)

      if (!player) {
        return res.status(404).json({
          success: false,
          message: 'Jugador no encontrado'
        })
      }

      if (player.photo) {

        const imgPath = path.join(process.cwd(), player.photo)

        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath)
        }

      }

      await Player.findByIdAndDelete(id)

      return res.status(200).json({
        success: true,
        message: 'Jugador eliminado correctamente'
      })

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: 'Error al eliminar jugador'
      })

    }
  }
}