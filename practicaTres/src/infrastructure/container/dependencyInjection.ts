import 'reflect-metadata';
import { IProductoRepository } from '../../domain/interfaces/IProductoRepository';
import { ProductoService } from '../../application/services/ProductoService';
import { ProductoController } from '../../presentation/controllers/ProductoController';

// Importar las implementaciones de repositorios
import { SequelizeProductoRepository } from '../data/sequelize/repositories/SequelizeProductoRepository';
import { TypeORMProductoRepository } from '../data/typeorm/repositories/TypeORMProductoRepository';

// Configurar qué implementación usar según variable de entorno
const ORM_TYPE = process.env.ORM_TYPE ?? 'typeorm';

console.log(`🔧 Configurando container con ORM: ${ORM_TYPE}`);

// Factory simple sin inversify
export class DIContainer {
  private static _instance: DIContainer;
  private _productoController: ProductoController | null = null;

  public static getInstance(): DIContainer {
    if (!DIContainer._instance) {
      DIContainer._instance = new DIContainer();
    }
    return DIContainer._instance;
  }

  public getProductoController(): ProductoController {
    if (!this._productoController) {
      // Crear repository
      let repository: IProductoRepository;
      if (ORM_TYPE === 'sequelize') {
        repository = new SequelizeProductoRepository();
      } else {
        repository = new TypeORMProductoRepository();
      }

      // Crear service
      const service = new ProductoService(repository);

      // Crear controller
      this._productoController = new ProductoController(service);
    }

    return this._productoController;
  }
}

// Export legacy para compatibilidad
export const container = DIContainer.getInstance();
export const TYPES = {
  ProductoRepository: 'ProductoRepository',
  ProductoService: 'ProductoService',
  ProductoController: 'ProductoController'
};