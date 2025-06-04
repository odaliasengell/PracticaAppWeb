import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pedido } from "./pedido";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario!: number;

  @Column()
  nombre!: string;

  @Column()
  correo!: string;

  @Column()
  contraseña!: string;

  @Column()
  tipo_usuario!: string;

  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos!: Pedido[];
}