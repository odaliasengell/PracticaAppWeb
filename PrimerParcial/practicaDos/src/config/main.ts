import "reflect-metadata";
import { AppDataSource } from "../config/data-source";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error("❌ Error al conectar:", error);
  }
}

main();