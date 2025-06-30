import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entities/usuario";
import { Restaurante } from "./entities/restaurante";
import { Producto } from "./entities/producto";
import { Pedido } from "./entities/pedido";
import { HistorialDesperdicio } from "./entities/historialdespercio";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",         
  password: "1234",      
  database: "practica_Web",     
  synchronize: true,
  logging: false,
  entities: [Usuario, Restaurante, Producto, Pedido, HistorialDesperdicio],
});