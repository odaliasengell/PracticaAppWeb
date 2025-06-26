import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vista } from "./vista";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  correo!: string;

  @OneToMany (()=>Vista, (Vista:Vista)=>Vista.Usuario)
  vistas!: Vista[]
}
