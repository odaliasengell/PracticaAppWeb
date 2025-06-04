import { AppDataSource } from "../config/data-source";
import {
  crearUsuario,
  listarUsuarios,
} from "../metodos";

async function main() {
  await AppDataSource.initialize();
  console.log("✅ Base de datos conectada");

  // 1. Insertar nuevo usuario
  const nuevo = await crearUsuario({
    nombre: "Carlos",
    correo: "carlos@mail.com",
    contraseña: "c1234",
    tipo_usuario: "cliente"
  });
  console.log("📌 Usuario insertado:", nuevo);

  // 2. Listar todos los usuarios
  const usuarios = await listarUsuarios();
  console.log("📋 Todos los usuarios:", usuarios);

  // 3. Buscar usuario por ID
  const encontrado = usuarios.find(u => u.id_usuario === nuevo.id_usuario);
  console.log("🔍 Usuario por ID:", encontrado);

  // 4. Modificar usuario
  if (encontrado) {
    const actualizado = await crearUsuario({
      ...encontrado,
      nombre: "Carlos Modificado",
    });
    console.log("✏ Usuario modificado:", actualizado);
  }

  // 5. Eliminar usuario
  await AppDataSource.getRepository("Usuario").delete(nuevo.id_usuario);
  console.log("🗑 Usuario eliminado con ID:", nuevo.id_usuario);
}

main().catch((error) => {
  console.error("❌ Error durante ejecución:", error);
});