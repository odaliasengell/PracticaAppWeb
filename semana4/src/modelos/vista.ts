import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Usuario } from "./usuario";

@Entity()
export class Vista {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @ManyToMany (()=>Usuario, (Usuario:Usuario)=>Usuario.vistas)
  Usuario!: Usuario

}