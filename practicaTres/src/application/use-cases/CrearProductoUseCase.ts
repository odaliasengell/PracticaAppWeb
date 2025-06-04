import { IProductoRepository } from '../../domain/interfaces/IProductoRepository';
import { Producto } from '../../domain/entities/Producto';

export class CrearProductoUseCase {
  constructor(
    private productoRepository: IProductoRepository
  ) {}

  async execute(datos: {
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    restauranteId: string;
    imagen?: string;
  }): Promise<Producto> {
    
    const existe = await this.productoRepository.existsByNombre(
      datos.nombre, 
      datos.restauranteId
    );
    
    if (existe) {
      throw new Error('Ya existe un producto con ese nombre en el restaurante');
    }

    const producto = new Producto(
      this.generarId(),
      datos.nombre,
      datos.descripcion,
      datos.precio,
      datos.categoria,
      datos.restauranteId,
      datos.imagen
    );

    return await this.productoRepository.save(producto);
  }

  private generarId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}