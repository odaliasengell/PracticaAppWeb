import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('productos')
export class ProductoEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ length: 100 })
  nombre!: string;

  @Column('text')
  descripcion!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio!: number;

  @Column({ length: 50 })
  categoria!: string;

  @Column({ name: 'restaurante_id' })
  restauranteId!: string;

  @Column({ nullable: true })
  imagen?: string;

  @Column({ default: true })
  activo!: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion!: Date;
}