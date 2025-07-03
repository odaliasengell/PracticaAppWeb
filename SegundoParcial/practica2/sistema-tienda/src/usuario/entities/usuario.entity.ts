import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@ObjectType()
@Entity()
export class Usuario {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ default: true })
  activo: boolean;

  @Field(() => [Pedido], { nullable: true }) // 👈 Aquí está la magia
  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];
}
