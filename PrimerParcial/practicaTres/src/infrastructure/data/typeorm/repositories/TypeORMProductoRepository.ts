import { Repository } from 'typeorm';
import { injectable } from 'inversify';
import { IProductoRepository } from '../../../../domain/interfaces/IProductoRepository';
import { Producto } from '../../../../domain/entities/Producto';
import { ProductoEntity } from '../entities/ProductoEntity';
import { AppDataSource } from '../data-source/AppDataSource';

@injectable()
export class TypeORMProductoRepository implements IProductoRepository {
  private readonly repository: Repository<ProductoEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductoEntity);
  }

  async findById(id: string): Promise<Producto | null> {
    try {
      const entity = await this.repository.findOne({ where: { id } });
      return entity ? this.toDomain(entity) : null;
    } catch (error) {
      console.error('Error finding product by id:', error);
      throw error;
    }
  }

  async findAll(): Promise<Producto[]> {
    try {
      const entities = await this.repository.find({
        order: { fechaCreacion: 'DESC' }
      });
      return entities.map(entity => this.toDomain(entity));
    } catch (error) {
      console.error('Error finding all products:', error);
      throw error;
    }
  }

  async findByRestaurante(restauranteId: string): Promise<Producto[]> {
    try {
      const entities = await this.repository.find({ 
        where: { restauranteId, activo: true },
        order: { fechaCreacion: 'DESC' }
      });
      return entities.map(entity => this.toDomain(entity));
    } catch (error) {
      console.error('Error finding products by restaurant:', error);
      throw error;
    }
  }

  async findByCategoria(categoria: string): Promise<Producto[]> {
    try {
      const entities = await this.repository.find({ 
        where: { categoria, activo: true },
        order: { fechaCreacion: 'DESC' }
      });
      return entities.map(entity => this.toDomain(entity));
    } catch (error) {
      console.error('Error finding products by category:', error);
      throw error;
    }
  }

  async save(producto: Producto): Promise<Producto> {
    try {
      const entity = this.toEntity(producto);
      const saved = await this.repository.save(entity);
      return this.toDomain(saved);
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  }

  async update(producto: Producto): Promise<Producto> {
    try {
      const entity = this.toEntity(producto);
      await this.repository.update(producto.id, entity);
      const updated = await this.repository.findOne({ where: { id: producto.id } });
      if (!updated) {
        throw new Error('Product not found after update');
      }
      return this.toDomain(updated);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async existsByNombre(nombre: string, restauranteId: string): Promise<boolean> {
    try {
      const count = await this.repository.count({ 
        where: { nombre, restauranteId } 
      });
      return count > 0;
    } catch (error) {
      console.error('Error checking if product exists by name:', error);
      throw error;
    }
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