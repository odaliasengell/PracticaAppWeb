import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RepartidorService } from './repartidor.service';
import { CreateRepartidorDto } from './dto/create-repartidor.dto';
import { UpdateRepartidorDto } from './dto/update-repartidor.dto';

@WebSocketGateway({ cors: true })
export class RepartidorGateway {
  @WebSocketServer() wss: Server;

  constructor(private readonly service: RepartidorService) {}

  @SubscribeMessage('createRepartidor')
  async create(@MessageBody() dto: CreateRepartidorDto) {
    await this.service.create(dto);
    this.wss.emit('repartidores', await this.service.findAll());
  }

  @SubscribeMessage('updateRepartidor')
  async update(@MessageBody() payload: { id: number; dto: UpdateRepartidorDto }) {
    await this.service.update(payload.id, payload.dto);
    this.wss.emit('repartidores', await this.service.findAll());
  }

  @SubscribeMessage('deleteRepartidor')
  async delete(@MessageBody() id: number) {
    await this.service.remove(id);
    this.wss.emit('repartidores', await this.service.findAll());
  }

  @SubscribeMessage('getAllRepartidores')
  async findAll() {
    this.wss.emit('repartidores', await this.service.findAll());
  }
}
