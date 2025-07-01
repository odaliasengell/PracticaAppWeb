import { Injectable } from '@nestjs/common';
import { CreateTuristaInput } from './dto/create-turista.input';
import { UpdateTuristaInput } from './dto/update-turista.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Turista } from './entities/turista.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TuristasService {
  constructor(@InjectRepository(Turista)
  private readonly repository: Repository<Turista>) { }

  create(createTuristaInput: CreateTuristaInput) {
    const turista = this.repository.create(createTuristaInput);
    return this.repository.save(turista);
  }

  findAll() {
    return `This action returns all turistas`;
  }

  findOne(id: string) {
    return `This action returns a #${id} turista`;
  }

  update(id: string, updateTuristaInput: UpdateTuristaInput) {
    return `This action updates a #${id} turista`;
  }

  remove(id: string) {
    return `This action removes a #${id} turista`;
  }
}
