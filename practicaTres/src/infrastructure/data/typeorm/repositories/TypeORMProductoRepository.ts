import { Repository } from 'typeorm';
import { IProductoRepository } from '../../../../domain/interfaces/IProductoRepository';
import { Producto } from '../../../../domain/entities/Producto';
import { ProductoEntity } from '../entities/ProductoEntity';
import { AppDataSource } from  '../data-source/AppDataSource';

export class TypeORMProductoRepository implements IProductoRepository {
  private readonly repository: Repository<ProductoEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductoEntity);
  }

  async findById(id: string): Promise<Producto | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Producto[]> {
    const entities = await this.repository.find();
    return entities.map(entity => this.toDomain(entity));
  }

  async findByRestaurante(restauranteId: string): Promise<Producto[]> {
    const entities = await this.repository.find({ 
      where: { restauranteId, activo: true } 
    });
    return entities.map(entity => this.toDomain(entity));
  }

  async findByCategoria(categoria: string): Promise<Producto[]> {
    const entities = await this.repository.find({ 
      where: { categoria, activo: true } 
    });
    return entities.map(entity => this.toDomain(entity));
  }

  async save(producto: Producto): Promise<Producto> {
    const entity = this.toEntity(producto);
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async update(producto: Producto): Promise<Producto> {
    const entity = this.toEntity(producto);
    await this.repository.update(producto.id, entity);
    const updated = await this.repository.findOne({ where: { id: producto.id } });
    return this.toDomain(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async existsByNombre(nombre: string, restauranteId: string): Promise<boolean> {
    const count = await this.repository.count({ 
      where: { nombre, restauranteId } 
    });
    return count > 0;
  }

  private toDomain(entity: ProductoEntity): Producto {
    return new Producto(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.precio,
      entity.categoria,
      entity.restauranteId,
      entity.imagen,
      entity.activo,
      entity.fechaCreacion,
      entity.fechaActualizacion
    );
  }

  private toEntity(domain: Producto): Partial<ProductoEntity> {
    return {
      id: domain.id,
      nombre: domain.nombre,
      descripcion: domain.descripcion,
      precio: domain.precio,
      categoria: domain.categoria,
      restauranteId: domain.restauranteId,
      imagen: domain.imagen,
      activo: domain.activo,
      fechaCreacion: domain.fechaCreacion,
      fechaActualizacion: domain.fechaActualizacion
    };
  }
}