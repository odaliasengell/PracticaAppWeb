import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoService } from './producto.service';
import { ProductoGateway } from './producto.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  providers: [ProductoService, ProductoGateway],
})
export class ProductoModule {}
