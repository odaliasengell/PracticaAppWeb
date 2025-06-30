import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./usuario";
import { Restaurante } from "./restaurante";

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido!: number;

  @Column({ type: "timestamp" })
  fecha_pedido!: Date;

  @Column()
  estado!: string;

  @ManyToOne(() => Usuario, usuario => usuario.pedidos)
  usuario!: Usuario;

  @ManyToOne(() => Restaurante, restaurante => restaurante.pedidos)
  restaurante!: Restaurante;
}
