import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  create(data: CreateUsuarioInput): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(data);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['pedidos'] });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ['pedidos'] });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  async update(id: number, updateData: UpdateUsuarioInput): Promise<Usuario> {
    await this.usuarioRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.usuarioRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
