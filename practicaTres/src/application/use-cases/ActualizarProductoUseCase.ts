import { IProductoRepository } from '../../domain/interfaces/IProductoRepository';
import { Producto } from '../../domain/entities/Producto';

export class ActualizarProductoUseCase {
  constructor(
    private productoRepository: IProductoRepository
  ) {}

  async execute(id: string, datos: Partial<Producto>): Promise<Producto> {
    const producto = await this.productoRepository.findById(id);
    
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    producto.actualizar(datos);
    return await this.productoRepository.update(producto);
  }
}