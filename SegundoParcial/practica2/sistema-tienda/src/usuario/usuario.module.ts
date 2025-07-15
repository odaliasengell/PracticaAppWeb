import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioResolver } from './usuario.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuarioService, UsuarioResolver],
  exports: [TypeOrmModule], // 👈 EXPORTAR REPOSITORIO
})
export class UsuarioModule {}
