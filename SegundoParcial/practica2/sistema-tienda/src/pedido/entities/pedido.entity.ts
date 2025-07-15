import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Producto } from 'src/producto/entities/producto.entity';

@ObjectType()
@Entity()
export class Pedido {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Usuario)
  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Field(() => Producto)
  @ManyToOne(() => Producto, (producto) => producto.pedidos)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Field(() => Int)
  @Column('int')
  cantidad: number;

  @Field(() => Float)
  @Column('float')
  total: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'datetime', nullable: true })
  fecha_pedido: Date;
}
