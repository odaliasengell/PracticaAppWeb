import 'reflect-metadata'; // Importante para inversify
import express from 'express';
import cors from 'cors';
import { productoRoutes } from './presentation/routes/productoRoutes';
import { initializeDatabase as initTypeORM } from './infrastructure/data/typeorm/data-source/AppDataSource';
import { testConnection as testSequelize, syncModels } from './infrastructure/database/sequelize-config';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3000;
const ORM_TYPE = process.env.ORM_TYPE ?? 'typeorm';

// Middlewares
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    orm: ORM_TYPE 
  });
});

// Routes
app.use('/api/productos', productoRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Database initialization
async function startServer() {
  try {
    console.log(`🔧 Configurando aplicación con ORM: ${ORM_TYPE}`);
    
    if (ORM_TYPE === 'typeorm') {
      await initTypeORM();
    } else if (ORM_TYPE === 'sequelize') {
      await testSequelize();
      await syncModels();
    } else {
      console.warn('⚠️  ORM_TYPE no reconocido, usando TypeORM por defecto');
      await initTypeORM();
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`🌐 Health check disponible en: http://localhost:${PORT}/health`);
      console.log(`📊 API Productos disponible en: http://localhost:${PORT}/api/productos`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Cerrando servidor...');
  process.exit(0);
});

startServer();