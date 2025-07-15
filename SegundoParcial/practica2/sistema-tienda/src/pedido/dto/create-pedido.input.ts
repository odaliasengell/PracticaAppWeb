import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsInt, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

@InputType()
export class CreatePedidoInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  usuario_id: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  producto_id: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  cantidad: number;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  fecha_pedido: string;
}
