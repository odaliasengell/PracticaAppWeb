import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@WebSocketGateway({ cors: true })
export class ProductoGateway {
  @WebSocketServer() wss: Server;

  constructor(private readonly service: ProductoService) {}

  @SubscribeMessage('createProducto')
  async create(@MessageBody() dto: CreateProductoDto) {
    await this.service.create(dto);
    this.wss.emit('productos', await this.service.findAll());
  }

  @SubscribeMessage('updateProducto')
  async update(@MessageBody() payload: { id: number; dto: UpdateProductoDto }) {
    await this.service.update(payload.id, payload.dto);
    this.wss.emit('productos', await this.service.findAll());
  }

  @SubscribeMessage('deleteProducto')
  async delete(@MessageBody() id: number) {
    await this.service.remove(id);
    this.wss.emit('productos', await this.service.findAll());
  }

  @SubscribeMessage('getAllProductos')
  async findAll() {
    this.wss.emit('productos', await this.service.findAll());
  }
}
