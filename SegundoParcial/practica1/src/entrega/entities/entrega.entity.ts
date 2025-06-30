import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Entrega {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  direccion: string;

  @Column()
  fechaEntrega: string; // También puede ser Date, si lo prefieres

  @Column()
  productoId: number;

  @Column()
  repartidorId: number;
}
