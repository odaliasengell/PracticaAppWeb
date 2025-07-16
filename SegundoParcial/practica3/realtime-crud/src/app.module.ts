import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RepartidorModule } from './repartidor/repartidor.module';
import { ProductoModule } from './producto/producto.module';
import { RutaEntregaModule } from './ruta_entrega/ruta_entrega.module';

import { Repartidor } from './repartidor/entities/repartidor.entity';
import { Producto } from './producto/entities/producto.entity';
import { RutaEntrega } from './ruta_entrega/entities/ruta_entrega.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'app.db',
      entities: [Repartidor, Producto, RutaEntrega],
      synchronize: true, // ❗ Solo para desarrollo. No usar en producción.
    }),
    RepartidorModule,
    ProductoModule,
    RutaEntregaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
