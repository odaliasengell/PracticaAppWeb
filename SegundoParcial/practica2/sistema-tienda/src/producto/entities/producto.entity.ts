import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@ObjectType()
@Entity()
export class Producto {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  descripcion?: string;

  @Field(() => Float)
  @Column('float')
  precio: number;

  @Field(() => Int)
  @Column('int')
  stock: number;

  @Field(() => [Pedido], { nullable: true }) // 👈 ¡Esto es lo que faltaba!
  @OneToMany(() => Pedido, pedido => pedido.producto)
  pedidos: Pedido[];
}
