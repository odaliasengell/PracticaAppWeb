import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt } from 'class-validator';

@InputType()
export class CreateProductoInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @Field(() => Float)
  @IsNumber()
  precio: number;

  @Field(() => Int)
  @IsInt()
  stock: number;
}
