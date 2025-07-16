import { PartialType } from '@nestjs/mapped-types';
import { CreateRutaEntregaDto } from './create-ruta_entrega.dto';

export class UpdateRutaEntregaDto extends PartialType(CreateRutaEntregaDto) {}
