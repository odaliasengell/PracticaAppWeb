import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateProductoInput } from './create-producto.input';

@InputType()
export class UpdateProductoInput extends PartialType(CreateProductoInput) {}
