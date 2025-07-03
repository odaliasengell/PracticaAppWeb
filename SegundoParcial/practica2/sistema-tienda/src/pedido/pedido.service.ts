import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoInput } from './dto/create-pedido.input';
import { UpdatePedidoInput } from './dto/update-pedido.input';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Producto } from 'src/producto/entities/producto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(input: CreatePedidoInput): Promise<Pedido> {
    const usuario = await this.usuarioRepository.findOneBy({ id: input.usuario_id });
    const producto = await this.productoRepository.findOneBy({ id: input.producto_id });

    if (!usuario || !producto) {
      throw new NotFoundException('Usuario o Producto no encontrado');
    }

    const pedido = this.pedidoRepository.create({
      ...input,
      fecha_pedido: new Date(input.fecha_pedido), // ✅ FIX aplicado
      usuario,
      producto,
    });

    return this.pedidoRepository.save(pedido);
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({ relations: ['usuario', 'producto'] });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['usuario', 'producto'],
    });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  async update(id: number, input: UpdatePedidoInput): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOneBy({ id });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');

    if (input.usuario_id) {
      const usuario = await this.usuarioRepository.findOneBy({ id: input.usuario_id });
      if (usuario) pedido.usuario = usuario;
    }

    if (input.producto_id) {
      const producto = await this.productoRepository.findOneBy({ id: input.producto_id });
      if (producto) pedido.producto = producto;
    }

    Object.assign(pedido, {
      ...input,
      fecha_pedido: input.fecha_pedido ? new Date(input.fecha_pedido) : pedido.fecha_pedido, // ✅ También aquí
    });

    return this.pedidoRepository.save(pedido);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.pedidoRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
