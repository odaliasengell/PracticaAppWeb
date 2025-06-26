import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRepartidorDto } from './dto/create-repartidor.dto';
import { UpdateRepartidorDto } from './dto/update-repartidor.dto';
import { Repartidor } from './entities/repartidor.entity';

@Injectable()
export class RepartidorService {
  constructor(
    @InjectRepository(Repartidor)
    private readonly repartidorRepository: Repository<Repartidor>,
  ) {}

  async create(createDto: CreateRepartidorDto): Promise<Repartidor> {
    const repartidor = this.repartidorRepository.create(createDto);
    return this.repartidorRepository.save(repartidor);
  }

  async findAll(): Promise<Repartidor[]> {
    return this.repartidorRepository.find();
  }

  async findOne(id: number): Promise<Repartidor> {
    const repartidor = await this.repartidorRepository.findOneBy({ id });
    if (!repartidor) throw new NotFoundException(`Repartidor con ID ${id} no encontrado`);
    return repartidor;
  }

  async update(id: number, updateDto: UpdateRepartidorDto): Promise<Repartidor> {
    const repartidor = await this.repartidorRepository.preload({
      id,
      ...updateDto,
    });
    if (!repartidor) throw new NotFoundException(`Repartidor con ID ${id} no encontrado`);
    return this.repartidorRepository.save(repartidor);
  }

  async remove(id: number): Promise<void> {
    const repartidor = await this.findOne(id);
    await this.repartidorRepository.remove(repartidor);
  }
}
