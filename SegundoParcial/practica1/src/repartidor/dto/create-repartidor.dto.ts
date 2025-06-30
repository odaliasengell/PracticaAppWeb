import { IsString, IsNotEmpty, IsPhoneNumber, IsBoolean } from 'class-validator';

export class CreateRepartidorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsPhoneNumber('EC') // Ecuador, puedes cambiarlo si necesitas otro país
  telefono: string;

  @IsString()
  zona: string;

  @IsBoolean()
  disponible: boolean;
}
