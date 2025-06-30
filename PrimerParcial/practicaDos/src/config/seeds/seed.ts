import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/usuario";
import { Restaurante } from "../entities/restaurante";
import { Producto } from "../entities/producto";
import { Pedido } from "../entities/pedido";
import { HistorialDesperdicio } from "../entities/historialdespercio";

async function runSeeds() {
  await AppDataSource.initialize();

  const usuarioRepo = AppDataSource.getRepository(Usuario);
  const restauranteRepo = AppDataSource.getRepository(Restaurante);
  const productoRepo = AppDataSource.getRepository(Producto);
  const pedidoRepo = AppDataSource.getRepository(Pedido);
  const historialRepo = AppDataSource.getRepository(HistorialDesperdicio);

  const usuarios = await usuarioRepo.save([
    { nombre: "Ana", correo: "ana@mail.com", contraseña: "1234", tipo_usuario: "cliente" },
    { nombre: "Luis", correo: "luis@mail.com", contraseña: "abcd", tipo_usuario: "admin" }
  ]);

  const restaurantes = await restauranteRepo.save([
    { nombre: "Don Mario", direccion: "Calle 1", tipo_cocina: "Italiana", horario: "10:00-22:00" },
    { nombre: "La Sazón", direccion: "Avenida 2", tipo_cocina: "Criolla", horario: "08:00-20:00" }
  ]);

  const productos = await productoRepo.save([
    {
      nombre: "Pizza",
      descripcion: "Pizza de queso",
      precio_original: 10,
      precio_descuento: 6,
      fecha_caducidad: new Date("2025-06-01"),
      restaurante: restaurantes[0]
    },
    {
      nombre: "Arroz",
      descripcion: "Arroz con pollo",
      precio_original: 7,
      precio_descuento: 5,
      fecha_caducidad: new Date("2025-05-30"),
      restaurante: restaurantes[1]
    }
  ]);

  await pedidoRepo.save([
    { fecha_pedido: new Date(), estado: "pendiente", usuario: usuarios[0], restaurante: restaurantes[0] },
    { fecha_pedido: new Date(), estado: "entregado", usuario: usuarios[1], restaurante: restaurantes[1] }
  ]);

  await historialRepo.save([
    { fecha_registro: new Date(), cantidad_desechada: 2.5, motivo: "No se vendió", producto: productos[0] }
  ]);

  console.log("✅ Datos de prueba insertados.");
  process.exit();
}

runSeeds();
