import { PartialType } from '@nestjs/mapped-types';
import { CreateRepartidorDto } from './create-repartidor.dto';

export class UpdateRepartidorDto extends PartialType(CreateRepartidorDto) {}
