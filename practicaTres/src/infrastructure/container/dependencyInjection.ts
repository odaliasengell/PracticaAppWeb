import 'reflect-metadata';
import { Container } from 'inversify';
import { IProductoRepository } from '../../domain/interfaces/IProductoRepository';
import { ProductoService } from '../../application/services/ProductoService';
import { ProductoController } from '../../presentation/controllers/ProductoController';

// Importar las implementaciones de repositorios
import { SequelizeProductoRepository } from '../data/sequelize/repositories/SequelizeProductoRepository';
import { TypeORMProductoRepository } from '../data/typeorm/repositories/TypeORMProductoRepository';

// Definir símbolos para la inyección de dependencias
const TYPES = {
  ProductoRepository: Symbol.for('ProductoRepository'),
  ProductoService: Symbol.for('ProductoService'),
  ProductoController: Symbol.for('ProductoController')
};

const container = new Container();

// Configurar qué implementación usar según variable de entorno
const ORM_TYPE = process.env.ORM_TYPE ?? 'typeorm'; // 'typeorm' o 'sequelize'

console.log(`🔧 Configurando container con ORM: ${ORM_TYPE}`);

if (ORM_TYPE === 'sequelize') {
  container.bind<IProductoRepository>(TYPES.ProductoRepository).to(SequelizeProductoRepository);
} else {
  container.bind<IProductoRepository>(TYPES.ProductoRepository).to(TypeORMProductoRepository);
}

// Bind de servicios usando toDynamicValue
container.bind<ProductoService>(TYPES.ProductoService).toDynamicValue(() => {
  const repository = container.get<IProductoRepository>(TYPES.ProductoRepository);
  return new ProductoService(repository);
});

// Bind de controladores usando toDynamicValue
container.bind<ProductoController>(TYPES.ProductoController).toDynamicValue(() => {
  const service = container.get<ProductoService>(TYPES.ProductoService);
  return new ProductoController(service);
});

export { container, TYPES };