# API RESTful con NestJS, TypeORM y SQLite

Este proyecto es una API REST desarrollada con NestJS que implementa una arquitectura por capas y conecta con una base de datos SQLite usando TypeORM. La aplicación expone endpoints para gestionar tres entidades: **Producto**, **Repartidor** y **Entrega**.

---

## 📦 Tecnologías utilizadas

- NestJS
- TypeORM
- SQLite
- TypeScript
- class-validator
- Postman (para pruebas)

---

## 🚀 Instrucciones de instalación

1. Clona este repositorio:

```bash
git clone https://github.com/odaliasengell/Practicas_Aweb
cd SegundoParcial
cd practica1
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el proyecto en modo desarrollo:

```bash
npm run start:dev
```

La aplicación correrá por defecto en `http://localhost:3000`.

---

## 🧪 Pruebas con Postman

Se han implementado 15 endpoints (5 por entidad) para realizar operaciones CRUD:

### ✅ Endpoints disponibles

#### Producto
- `POST /producto` → Crear un producto
- `GET /producto` → Obtener todos los productos
- `GET /producto/:id` → Obtener un producto por ID
- `PATCH /producto/:id` → Actualizar un producto
- `DELETE /producto/:id` → Eliminar un producto

#### Repartidor
- `POST /repartidor` → Crear un repartidor
- `GET /repartidor` → Obtener todos los repartidores
- `GET /repartidor/:id` → Obtener un repartidor por ID
- `PATCH /repartidor/:id` → Actualizar un repartidor
- `DELETE /repartidor/:id` → Eliminar un repartidor

#### Entrega
- `POST /entrega` → Crear una entrega
- `GET /entrega` → Obtener todas las entregas
- `GET /entrega/:id` → Obtener una entrega por ID
- `PATCH /entrega/:id` → Actualizar una entrega
- `DELETE /entrega/:id` → Eliminar una entrega

---

## 📁 Colecciones de Postman

Puedes importar los siguientes archivos `.json` en Postman para probar la API:

- [Colección](./Producto_Postman_Collection.json)

