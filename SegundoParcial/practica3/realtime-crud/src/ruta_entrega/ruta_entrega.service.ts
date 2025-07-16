import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RutaEntrega } from './entities/ruta_entrega.entity';
import { CreateRutaEntregaDto } from './dto/create-ruta_entrega.dto';
import { UpdateRutaEntregaDto } from './dto/update-ruta_entrega.dto';

@Injectable()
export class RutaEntregaService {
  constructor(
    @InjectRepository(RutaEntrega)
    private readonly repo: Repository<RutaEntrega>,
  ) {}

  create(dto: CreateRutaEntregaDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  update(id: number, dto: UpdateRutaEntregaDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
