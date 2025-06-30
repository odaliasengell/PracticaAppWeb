import { AppDataSource } from "./config/data-source";
import { Usuario } from "../src/config/entities/usuario";
import { Restaurante } from "../src/config/entities/restaurante";
import { Producto } from "../src/config/entities/producto";
import { Pedido } from "../src/config/entities/pedido";
import { HistorialDesperdicio } from "../src/config/entities/historialdespercio";

// ---------- USUARIO ----------
export const crearUsuario = async (data: Partial<Usuario>) => {
  return await AppDataSource.getRepository(Usuario).save(data);
};

export const listarUsuarios = async () => {
  return await AppDataSource.getRepository(Usuario).find({ relations: ["pedidos"] });
};

// ---------- RESTAURANTE ----------
export const crearRestaurante = async (data: Partial<Restaurante>) => {
  return await AppDataSource.getRepository(Restaurante).save(data);
};

export const listarRestaurantes = async () => {
  return await AppDataSource.getRepository(Restaurante).find({ relations: ["productos", "pedidos"] });
};

// ---------- PRODUCTO ----------
export const crearProducto = async (data: Partial<Producto>) => {
  return await AppDataSource.getRepository(Producto).save(data);
};

export const listarProductos = async () => {
  return await AppDataSource.getRepository(Producto).find({ relations: ["restaurante", "historialDesperdicio"] });
};

// ---------- PEDIDO ----------
export const crearPedido = async (data: Partial<Pedido>) => {
  return await AppDataSource.getRepository(Pedido).save(data);
};

export const listarPedidos = async () => {
  return await AppDataSource.getRepository(Pedido).find({ relations: ["usuario", "restaurante"] });
};

// ---------- HISTORIAL DESPERDICIO ----------
export const crearHistorial = async (data: Partial<HistorialDesperdicio>) => {
  return await AppDataSource.getRepository(HistorialDesperdicio).save(data);
};

export const listarHistoriales = async () => {
  return await AppDataSource.getRepository(HistorialDesperdicio).find({ relations: ["producto"] });
};
