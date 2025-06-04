import { injectable } from 'inversify';
import { IProductoRepository } from '../../../../domain/interfaces/IProductoRepository';
import { Producto } from '../../../../domain/entities/Producto';
import { ProductoModel } from '../models/ProductoModel';

@injectable()
export class SequelizeProductoRepository implements IProductoRepository {
  
  async findById(id: string): Promise<Producto | null> {
    try {
      const model = await ProductoModel.findByPk(id);
      return model ? this.toDomain(model) : null;
    } catch (error) {
      console.error('Error finding product by id:', error);
      throw error;
    }
  }

  async findAll(): Promise<Producto[]> {
    try {
      const models = await ProductoModel.findAll({
        order: [['fechaCreacion', 'DESC']]
      });
      return models.map(model => this.toDomain(model));
    } catch (error) {
      console.error('Error finding all products:', error);
      throw error;
    }
  }

  async findByRestaurante(restauranteId: string): Promise<Producto[]> {
    try {
      const models = await ProductoModel.findAll({ 
        where: { restauranteId, activo: true },
        order: [['fechaCreacion', 'DESC']]
      });
      return models.map(model => this.toDomain(model));
    } catch (error) {
      console.error('Error finding products by restaurant:', error);
      throw error;
    }
  }

  async findByCategoria(categoria: string): Promise<Producto[]> {
    try {
      const models = await ProductoModel.findAll({ 
        where: { categoria, activo: true },
        order: [['fechaCreacion', 'DESC']]
      });
      return models.map(model => this.toDomain(model));
    } catch (error) {
      console.error('Error finding products by category:', error);
      throw error;
    }
  }

  async save(producto: Producto): Promise<Producto> {
    try {
      const model = await ProductoModel.create(this.toModel(producto));
      return this.toDomain(model);
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  }

  async update(producto: Producto): Promise<Producto> {
    try {
      await ProductoModel.update(this.toModel(producto), {
        where: { id: producto.id }
      });
      const updated = await ProductoModel.findByPk(producto.id);
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
      await ProductoModel.destroy({ where: { id } });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async existsByNombre(nombre: string, restauranteId: string): Promise<boolean> {
    try {
      const count = await ProductoModel.count({ 
        where: { nombre, restauranteId } 
      });
      return count > 0;
    } catch (error) {
      console.error('Error checking if product exists by name:', error);
      throw error;
    }
  }

  private toDomain(model: any): Producto {
    return new Producto(
      model.id,
      model.nombre,
      model.descripcion,
      model.precio,
      model.categoria,
      model.restauranteId,
      model.imagen,
      model.activo,
      model.fechaCreacion,
      model.fechaActualizacion
    );
  }

  private toModel(domain: Producto): any {
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