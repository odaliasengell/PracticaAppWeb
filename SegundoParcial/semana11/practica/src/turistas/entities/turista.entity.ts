import { ObjectType, Field, Int, ID,  } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'turistas' })
export class Turista {

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID, )
  id: string;

  @Column()
  @Field(() => String, )
  nombre: string;

  @Column()
  @Field(() => String, )
  email: string;
}
