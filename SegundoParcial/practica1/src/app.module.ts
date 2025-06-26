import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModule } from './producto/producto.module';
import { RepartidorModule } from './repartidor/repartidor.module';
import { EntregaModule } from './entrega/entrega.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductoModule,
    RepartidorModule,
    EntregaModule,
  ],
  controllers: [], // Aquí puedes agregar controladores globales si los necesitas
  providers: [],   // Aquí puedes agregar servicios globales si los necesitas
})
export class AppModule {}
