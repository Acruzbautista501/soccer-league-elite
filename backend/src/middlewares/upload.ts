import multer from 'multer'
import type { Request } from 'express'
import type { FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs'

export const createUploader = (folder: string) => {

  const uploadPath = path.join(process.cwd(), `uploads/${folder}`)

  // Crear carpeta si no existe
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }

  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, uploadPath)
    },

    filename: (req: Request, file: Express.Multer.File, cb) => {
      const uniqueName = `${folder}-${Date.now()}${path.extname(file.originalname)}`
      cb(null, uniqueName)
    }
  })

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {

    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/svg+xml'
    ]

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Solo se permiten imágenes PNG, JPG o SVG'))
    }
  }

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 2 * 1024 * 1024 // 2MB
    }
  })
}