import { IProductoRepository } from '../../domain/interfaces/IProductoRepository';
import { CrearProductoUseCase } from '../use-cases/CrearProductoUseCase';
import { ActualizarProductoUseCase } from '../use-cases/ActualizarProductoUseCase';
import { ObtenerProductoUseCase } from '../use-cases/ObtenerProductoUseCase';

export class ProductoService {
  private crearProductoUseCase: CrearProductoUseCase;
  private actualizarProductoUseCase: ActualizarProductoUseCase;
  private obtenerProductoUseCase: ObtenerProductoUseCase;

  constructor(private productoRepository: IProductoRepository) {
    this.crearProductoUseCase = new CrearProductoUseCase(productoRepository);
    this.actualizarProductoUseCase = new ActualizarProductoUseCase(productoRepository);
    this.obtenerProductoUseCase = new ObtenerProductoUseCase(productoRepository);
  }

  async crearProducto(datos: any) {
    return await this.crearProductoUseCase.execute(datos);
  }

  async actualizarProducto(id: string, datos: any) {
    return await this.actualizarProductoUseCase.execute(id, datos);
  }

  async obtenerProducto(id: string) {
    return await this.obtenerProductoUseCase.execute(id);
  }

  async listarProductos() {
    return await this.productoRepository.findAll();
  }

  async listarPorRestaurante(restauranteId: string) {
    return await this.productoRepository.findByRestaurante(restauranteId);
  }
}