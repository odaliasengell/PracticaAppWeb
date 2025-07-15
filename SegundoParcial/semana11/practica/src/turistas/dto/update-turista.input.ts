import { IsUUID } from 'class-validator';
import { CreateTuristaInput } from './create-turista.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTuristaInput extends PartialType(CreateTuristaInput) {

  @IsUUID()
  @Field(() => ID)
  id: string;
}
