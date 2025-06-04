
// src/presentation/routes/productoRoutes.ts
import { Router } from 'express';
import { ProductoController } from '../controllers/ProductoController';
import { container, TYPES } from '../../infrastructure/container/dependencyInjection';

const router = Router();

// Obtener el controlador usando factory
const controllerFactory = container.get<() => ProductoController>(TYPES.ProductoController);
const productoController = controllerFactory();

router.post('/', (req, res) => productoController.crear(req, res));
router.get('/', (req, res) => productoController.listar(req, res));
router.get('/:id', (req, res) => productoController.obtener(req, res));
router.put('/:id', (req, res) => productoController.actualizar(req, res));

export { router as productoRoutes };