import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repartidor } from './entities/repartidor.entity';
import { CreateRepartidorDto } from './dto/create-repartidor.dto';
import { UpdateRepartidorDto } from './dto/update-repartidor.dto';

@Injectable()
export class RepartidorService {
  constructor(
    @InjectRepository(Repartidor)
    private readonly repo: Repository<Repartidor>,
  ) {}

  create(dto: CreateRepartidorDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  update(id: number, dto: UpdateRepartidorDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
