import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoResolver } from './producto.resolver';
import { Producto } from './entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto]),
  ],
  providers: [ProductoService, ProductoResolver],
  exports: [
    ProductoService,
    TypeOrmModule,  // 👈 ESTO PERMITE USAR ProductoRepository EN OTROS MÓDULOS
  ],
})
export class ProductoModule {}
