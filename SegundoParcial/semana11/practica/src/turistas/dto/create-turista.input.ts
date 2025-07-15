import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateTuristaInput {
 
  @IsString()
    @Field(() => String, )
    nombre: string;
  
    @IsEmail()
    @Field(() => String, )
    email: string;
  }
