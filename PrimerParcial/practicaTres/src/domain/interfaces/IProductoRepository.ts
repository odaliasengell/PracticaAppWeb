import { Producto } from '../entities/Producto';

export interface IProductoRepository {
  findById(id: string): Promise<Producto | null>;
  findAll(): Promise<Producto[]>;
  findByRestaurante(restauranteId: string): Promise<Producto[]>;
  findByCategoria(categoria: string): Promise<Producto[]>;
  save(producto: Producto): Promise<Producto>;
  update(producto: Producto): Promise<Producto>;
  delete(id: string): Promise<void>;
  existsByNombre(nombre: string, restauranteId: string): Promise<boolean>;
}