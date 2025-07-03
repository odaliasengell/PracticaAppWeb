import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoResolver } from './pedido.resolver';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ProductoModule } from 'src/producto/producto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Usuario, Producto]),
    UsuarioModule, // 👈 IMPORTAR MÓDULO QUE EXPORTA REPO
    ProductoModule,
  ],
  providers: [PedidoService, PedidoResolver],
})
export class PedidoModule {}
