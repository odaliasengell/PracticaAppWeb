import { DataSource } from "typeorm";
import { Usuario } from "./modelos/usuario";
import { Vista } from  "./modelos/vista";
import "reflect-metadata"; 

export const appdatasource = new DataSource({
  type: "sqlite",
  database: "database-sqlite",
  entities: [Usuario, Vista],
  synchronize: true,
  logging: true,
  migrations: [] 
});
