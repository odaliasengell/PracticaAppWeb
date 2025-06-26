import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Producto } from "./producto";

@Entity()
export class HistorialDesperdicio {
  @PrimaryGeneratedColumn()
  id_historial!: number;

  @Column({ type: "timestamp" })
  fecha_registro!: Date;

  @Column("float")
  cantidad_desechada!: number;

  @Column()
  motivo!: string;

  @ManyToOne(() => Producto, producto => producto.historialDesperdicio)
  producto!: Producto;
}
