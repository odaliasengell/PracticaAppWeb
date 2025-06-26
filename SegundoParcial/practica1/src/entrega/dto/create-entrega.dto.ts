import { IsString, IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateEntregaDto {
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsDateString()
  fechaEntrega: string;

  @IsInt()
  productoId: number;

  @IsInt()
  repartidorId: number;
}
