import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RutaEntregaService } from './ruta_entrega.service';
import { CreateRutaEntregaDto } from './dto/create-ruta_entrega.dto';
import { UpdateRutaEntregaDto } from './dto/update-ruta_entrega.dto';

@WebSocketGateway({ cors: true })
export class RutaEntregaGateway {
  @WebSocketServer() wss: Server;

  constructor(private readonly service: RutaEntregaService) {}

  @SubscribeMessage('createRutaEntrega')
  async create(@MessageBody() dto: CreateRutaEntregaDto) {
    await this.service.create(dto);
    this.wss.emit('rutasEntrega', await this.service.findAll());
  }

  @SubscribeMessage('updateRutaEntrega')
  async update(@MessageBody() payload: { id: number; dto: UpdateRutaEntregaDto }) {
    await this.service.update(payload.id, payload.dto);
    this.wss.emit('rutasEntrega', await this.service.findAll());
  }

  @SubscribeMessage('deleteRutaEntrega')
  async delete(@MessageBody() id: number) {
    await this.service.remove(id);
    this.wss.emit('rutasEntrega', await this.service.findAll());
  }

  @SubscribeMessage('getAllRutasEntrega')
  async findAll() {
    this.wss.emit('rutasEntrega', await this.service.findAll());
  }
}
