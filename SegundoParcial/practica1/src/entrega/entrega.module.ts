import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaService } from './entrega.service';
import { EntregaController } from './entrega.controller';
import { Entrega } from './entities/entrega.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrega])],
  controllers: [EntregaController],
  providers: [EntregaService],
})
export class EntregaModule {}
