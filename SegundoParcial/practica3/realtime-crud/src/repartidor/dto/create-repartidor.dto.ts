import { IsString, IsPhoneNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateRepartidorDto {
  @IsString()
  nombre: string;

  @IsPhoneNumber('EC')
  telefono: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
