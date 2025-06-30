import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { Entrega } from './entities/entrega.entity';

@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(Entrega)
    private readonly entregaRepository: Repository<Entrega>,
  ) {}

  async create(createDto: CreateEntregaDto): Promise<Entrega> {
    const entrega = this.entregaRepository.create(createDto);
    return this.entregaRepository.save(entrega);
  }

  async findAll(): Promise<Entrega[]> {
    return this.entregaRepository.find();
  }

  async findOne(id: number): Promise<Entrega> {
    const entrega = await this.entregaRepository.findOneBy({ id });
    if (!entrega) throw new NotFoundException(`Entrega con ID ${id} no encontrada`);
    return entrega;
  }

  async update(id: number, updateDto: UpdateEntregaDto): Promise<Entrega> {
    const entrega = await this.entregaRepository.preload({
      id,
      ...updateDto,
    });
    if (!entrega) throw new NotFoundException(`Entrega con ID ${id} no encontrada`);
    return this.entregaRepository.save(entrega);
  }

  async remove(id: number): Promise<void> {
    const entrega = await this.findOne(id);
    await this.entregaRepository.remove(entrega);
  }
}
