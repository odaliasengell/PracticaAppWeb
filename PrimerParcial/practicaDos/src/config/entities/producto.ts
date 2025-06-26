import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Restaurante } from "./restaurante";
import { HistorialDesperdicio } from "./historialdespercio";

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column("float")
  precio_original!: number;

  @Column("float")
  precio_descuento!: number;

  @Column({ type: "date" })
  fecha_caducidad!: Date;

  @ManyToOne(() => Restaurante, restaurante => restaurante.productos)
  restaurante!: Restaurante;

  @OneToMany(() => HistorialDesperdicio, historial => historial.producto)
  historialDesperdicio!: HistorialDesperdicio[];
}
