import express from 'express';
import { productoRoutes } from './presentation/routes/productoRoutes';
import { AppDataSource } from './infrastructure/database/typeorm-config';
import { sequelize } from './infrastructure/database/sequelize-config';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/productos', productoRoutes);

// Database initialization
async function startServer() {
  try {
    // Initialize TypeORM
    await AppDataSource.initialize();
    console.log('✅ TypeORM conectado');
    
    // Initialize Sequelize
    await sequelize.authenticate();
    console.log('✅ Sequelize conectado');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

startServer();