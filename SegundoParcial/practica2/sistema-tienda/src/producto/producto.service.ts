import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoInput } from './dto/create-producto.input';
import { UpdateProductoInput } from './dto/update-producto.input';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  create(data: CreateProductoInput): Promise<Producto> {
    const nuevo = this.productoRepository.create(data);
    return this.productoRepository.save(nuevo);
  }

  findAll(): Promise<Producto[]> {
    return this.productoRepository.find({ relations: ['pedidos'] });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id }, relations: ['pedidos'] });
    if (!producto) throw new NotFoundException(`Producto with id ${id} not found`);
    return producto;
  }

  async update(id: number, data: UpdateProductoInput): Promise<Producto> {
    await this.productoRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.productoRepository.delete(id);
    return (res.affected ?? 0) > 0;
  }
}
