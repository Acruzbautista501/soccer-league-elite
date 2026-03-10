import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import teamRoutes from './routes/teamRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import calendarRoutes from './routes/calendarRoutes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// SERVIR IMÁGENES
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Rutas
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/calendar', calendarRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/liga-elite';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => console.error('Error de conexión:', err));