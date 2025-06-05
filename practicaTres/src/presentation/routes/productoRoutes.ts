import { Router } from 'express';
import { ProductoController } from '../controllers/ProductoController';
import { ProductoService } from '../../application/services/ProductoService';
import { TypeORMProductoRepository } from '../../infrastructure/data/typeorm/repositories/TypeORMProductoRepository';
import { SequelizeProductoRepository } from '../../infrastructure/data/sequelize/repositories/SequelizeProductoRepository';

const router = Router();

// Crear dependencias directamente
const ORM_TYPE = process.env.ORM_TYPE ?? 'typeorm';
const repository = ORM_TYPE === 'sequelize' 
  ? new SequelizeProductoRepository() 
  : new TypeORMProductoRepository();

const productoService = new ProductoService(repository);
const productoController = new ProductoController(productoService);

// Definir las rutas
router.post('/', (req, res) => productoController.crear(req, res));
router.get('/', (req, res) => productoController.listar(req, res));
router.get('/:id', (req, res) => productoController.obtener(req, res));
router.put('/:id', (req, res) => productoController.actualizar(req, res));

export { router as productoRoutes };