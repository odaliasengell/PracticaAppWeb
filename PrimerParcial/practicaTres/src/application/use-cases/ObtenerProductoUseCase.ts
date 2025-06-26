import { IProductoRepository } from '../../domain/interfaces/IProductoRepository';
import { Producto } from '../../domain/entities/Producto';

export class ObtenerProductoUseCase {
  constructor(
    private productoRepository: IProductoRepository
  ) {}

  async execute(id: string): Promise<Producto | null> {
    return await this.productoRepository.findById(id);
  }
}