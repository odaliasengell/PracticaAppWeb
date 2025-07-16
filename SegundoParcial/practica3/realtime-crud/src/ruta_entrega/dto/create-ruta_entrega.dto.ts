import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRutaEntregaDto {
  @IsString()
  origen: string;

  @IsString()
  destino: string;

  @IsOptional()
  @IsNumber()
  distanciaKm?: number;
}
