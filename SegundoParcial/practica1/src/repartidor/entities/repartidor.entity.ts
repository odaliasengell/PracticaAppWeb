import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Repartidor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @Column()
  zona: string;

  @Column({ default: true })
  disponible: boolean;
}
