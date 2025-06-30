import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize({
  dialect: 'postgres', // o 'mysql', 'sqlite', etc.
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_NAME ?? 'restaurante_db',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  ssl: process.env.NODE_ENV === 'production',
  dialectOptions: process.env.NODE_ENV === 'production' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

// Función para probar la conexión
export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Sequelize conectado exitosamente');
  } catch (error) {
    console.error('❌ Error conectando Sequelize:', error);
    throw error;
  }
};

// Función para sincronizar modelos (solo en desarrollo)
export const syncModels = async (): Promise<void> => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Modelos sincronizados');
    }
  } catch (error) {
    console.error('❌ Error sincronizando modelos:', error);
    throw error;
  }
};

// Función para cerrar la conexión
export const closeSequelize = async (): Promise<void> => {
  try {
    await sequelize.close();
    console.log('✅ Conexión Sequelize cerrada');
  } catch (error) {
    console.error('❌ Error cerrando Sequelize:', error);
  }
};