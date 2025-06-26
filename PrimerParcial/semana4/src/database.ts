import { appdatasource } from "./sqlite"; 
import "reflect-metadta"

export const inicializar = async () => {
  try {
    await appdatasource.initialize();
    console.log("Inicializado correctamente");
    return appdatasource;
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    throw error; // importante relanzar si quieres manejar el error más arriba
  }
};
