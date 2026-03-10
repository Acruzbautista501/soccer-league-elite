import type { Request, Response } from 'express'
import { Team } from '../models/Team.js'
import { Player } from '../models/Player.js'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'

export type TeamIdRequest = Request<{ id: string }>

export const TeamController = {

  // Listar equipos
  async getAll(req: Request, res: Response) {
    try {
      const { region } = req.query

      const filter = region ? { region } : {}

      const teams = await Team.find(filter)

      return res.status(200).json({
        success: true,
        message: 'Equipos obtenidos correctamente.',
        data: teams
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los equipos.'
      })
    }
  },


  // Obtener un equipo por ID
  async getOne(req: TeamIdRequest, res: Response) {
    try {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de equipo inválido'
        })
      }

      const team = await Team.findById(id)

      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Equipo no encontrado.'
        })
      }

      return res.status(200).json({
        success: true,
        data: team
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el equipo.'
      })
    }
  },


  // Crear equipo
  async create(req: Request, res: Response) {
    try {

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'El escudo del equipo es obligatorio.'
        })
      }

      const logoUrl = `/uploads/teams/${req.file.filename}`

      const newTeam = new Team({
        ...req.body,
        logoUrl
      })

      const savedTeam = await newTeam.save()

      return res.status(201).json({
        success: true,
        message: 'El equipo ha sido agregado exitosamente.',
        data: savedTeam
      })

    } catch (error) {

      if ((error as any).code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Ya existe un equipo con ese nombre.'
        })
      }

      return res.status(500).json({
        success: false,
        message: 'Error al registrar el equipo.'
      })
    }
  },


  // Actualizar equipo
  async update(req: TeamIdRequest, res: Response) {
    try {

      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de equipo inválido.'
        })
      }

      let updateData = { ...req.body }

      if (req.file) {

        const team = await Team.findById(id)

        if (team?.logoUrl) {

          const oldPath = path.join(process.cwd(), team.logoUrl)

          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
          }
        }

        updateData.logoUrl = `/uploads/teams/${req.file.filename}`
      }

      const updatedTeam = await Team.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      )

      if (!updatedTeam) {
        return res.status(404).json({
          success: false,
          message: 'Equipo no encontrado.'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'La información del equipo se actualizó correctamente.',
        data: updatedTeam
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar el equipo'
      })
    }
  },


  // Cambiar estado
  async toggleStatus(req: TeamIdRequest, res: Response) {
    try {

      const { id } = req.params
      const { status } = req.body

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de equipo inválido.'
        })
      }

      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'El estado es obligatorio.'
        })
      }

      const team = await Team.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      )

      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Equipo no encontrado.'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Estado del equipo actualizado.',
        data: team
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al cambiar el estado del equipo.'
      })
    }
  },


  // Eliminar equipo
  async delete(req: TeamIdRequest, res: Response) {
    try {

      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        })
      }

      const deletedTeam = await Team.findByIdAndDelete(id)

      if (!deletedTeam) {
        return res.status(404).json({
          success: false,
          message: 'Equipo no encontrado'
        })
      }

      // Opcional
      // await Player.deleteMany({ team: id })

      return res.status(200).json({
        success: true,
        message: 'El equipo ha sido eliminado correctamente.'
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar el equipo'
      })
    }
  },


  // Obtener jugadores de un equipo
  async getPlayers(req: TeamIdRequest, res: Response) {
    try {

      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de equipo inválido'
        })
      }

      const team = await Team.findById(id)

      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Equipo no encontrado'
        })
      }

      const players = await Player
        .find({ team: new mongoose.Types.ObjectId(id) })
        .select('-__v')
        .sort({ number: 1 })

      return res.status(200).json({
        success: true,
        data: {
          team,
          players
        }
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener la plantilla del equipo'
      })
    }
  }
}