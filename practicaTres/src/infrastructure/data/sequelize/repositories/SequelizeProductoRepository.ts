import { IProductoRepository } from '../../../../domain/interfaces/IProductoRepository';
import { Producto } from '../../../../domain/entities/Producto';
import { ProductoModel } from '../models/ProductoModel';

export class SequelizeProductoRepository implements IProductoRepository {
  
  async findById(id: string): Promise<Producto | null> {
    const model = await ProductoModel.findByPk(id);
    return model ? this.toDomain(model) : null;
  }

  async findAll(): Promise<Producto[]> {
    const models = await ProductoModel.findAll();
    return models.map(model => this.toDomain(model));
  }

  async findByRestaurante(restauranteId: string): Promise<Producto[]> {
    const models = await ProductoModel.findAll({ 
      where: { restauranteId, activo: true } 
    });
    return models.map(model => this.toDomain(model));
  }

  async findByCategoria(categoria: string): Promise<Producto[]> {
    const models = await ProductoModel.findAll({ 
      where: { categoria, activo: true } 
    });
    return models.map(model => this.toDomain(model));
  }

  async save(producto: Producto): Promise<Producto> {
    const model = await ProductoModel.create(this.toModel(producto));
    return this.toDomain(model);
  }

  async update(producto: Producto): Promise<Producto> {
    await ProductoModel.update(this.toModel(producto), {
      where: { id: producto.id }
    });
    const updated = await ProductoModel.findByPk(producto.id);
    return this.toDomain(updated!);
  }

  async delete(id: string): Promise<void> {
    await ProductoModel.destroy({ where: { id } });
  }

  async existsByNombre(nombre: string, restauranteId: string): Promise<boolean> {
    const count = await ProductoModel.count({ 
      where: { nombre, restauranteId } 
    });
    return count > 0;
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