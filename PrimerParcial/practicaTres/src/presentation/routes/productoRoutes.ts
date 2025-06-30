import { Router, Request, Response } from 'express';
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

// Rutas usando funciones nombradas para evitar problemas con arrow functions
router.post('/', function createProducto(req: Request, res: Response) {
  productoController.crear(req, res);
});

router.get('/', function listProductos(req: Request, res: Response) {
  productoController.listar(req, res);
});

router.get('/producto/:id', function getProducto(req: Request, res: Response) {
  productoController.obtener(req, res);
});

router.put('/producto/:id', function updateProducto(req: Request, res: Response) {
  productoController.actualizar(req, res);
});

export { router as productoRoutes };