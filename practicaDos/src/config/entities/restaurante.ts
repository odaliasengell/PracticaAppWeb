import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pedido } from "./pedido";
import { Producto } from "./producto";

@Entity()
export class Restaurante {
  @PrimaryGeneratedColumn()
  id_restaurante!: number;

  @Column()
  nombre!: string;

  @Column()
  direccion!: string;

  @Column()
  tipo_cocina!: string;

  @Column()
  horario!: string;

  @OneToMany(() => Pedido, pedido => pedido.restaurante)
  pedidos!: Pedido[];

  @OneToMany(() => Producto, producto => producto.restaurante)
  productos!: Producto[];
}