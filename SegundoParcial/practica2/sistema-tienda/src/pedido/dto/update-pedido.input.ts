import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePedidoInput } from './create-pedido.input';

@InputType()
export class UpdatePedidoInput extends PartialType(CreatePedidoInput) {}
