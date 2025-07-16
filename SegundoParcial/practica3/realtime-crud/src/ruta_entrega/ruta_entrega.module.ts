import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutaEntrega } from './entities/ruta_entrega.entity';
import { RutaEntregaService } from './ruta_entrega.service';
import { RutaEntregaGateway } from './ruta_entrega.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([RutaEntrega])],
  providers: [RutaEntregaService, RutaEntregaGateway],
})
export class RutaEntregaModule {}
