import { Module } from '@nestjs/common';
import { TuristasService } from './turistas.service';
import { TuristasResolver } from './turistas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turista } from './entities/turista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turista])],
  exports: [TypeOrmModule],
  providers: [TuristasResolver, TuristasService],
})
export class TuristasModule {}
