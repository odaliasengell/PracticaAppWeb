import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repartidor } from './entities/repartidor.entity';
import { RepartidorService } from './repartidor.service';
import { RepartidorGateway } from './repartidor.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Repartidor])],
  providers: [RepartidorService, RepartidorGateway],
})
export class RepartidorModule {}
