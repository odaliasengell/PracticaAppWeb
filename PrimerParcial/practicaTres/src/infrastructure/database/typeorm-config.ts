import { DataSource } from 'typeorm';
import { ProductoEntity } from '../data/typeorm/entities/ProductoEntity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres', // o 'mysql', 'sqlite', etc.
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_NAME ?? 'restaurante_db',
  synchronize: process.env.NODE_ENV !== 'production', // Solo en desarrollo
  logging: process.env.NODE_ENV === 'development',
  entities: [ProductoEntity],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  subscribers: ['src/infrastructure/database/subscribers/*.ts'],
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Función para inicializar la conexión
export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('✅ TypeORM conectado exitosamente');
  } catch (error) {
    console.error('❌ Error conectando TypeORM:', error);
    throw error;
  }
};

// Función para cerrar la conexión
export const closeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.destroy();
    console.log('✅ Conexión TypeORM cerrada');
  } catch (error) {
    console.error('❌ Error cerrando TypeORM:', error);
  }
};
