import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;
}
