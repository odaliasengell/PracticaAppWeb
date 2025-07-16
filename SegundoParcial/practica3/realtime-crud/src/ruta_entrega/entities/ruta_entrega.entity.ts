import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RutaEntrega {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origen: string;

  @Column()
  destino: string;

  @Column({ nullable: true })
  distanciaKm: number;
}
