
# 🛒 Sistema Tienda - API GraphQL con NestJS

Este proyecto es una API desarrollada con [NestJS](https://nestjs.com/) y [GraphQL](https://graphql.org/), conectada a una base de datos **SQLite** utilizando [TypeORM](https://typeorm.io/). Permite la gestión de **usuarios**, **productos** y **pedidos**, incluyendo sus relaciones.

---

## 🧱 Tecnologías utilizadas

- NestJS
- GraphQL (Apollo Server)
- TypeORM
- SQLite (base de datos embebida)
- Class Validator
- Node.js

---

## 📦 Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/odaliasengell/PracticaAppWeb
cd SegundoParcial
cd practica2
cd sistema-tienda
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Ejecuta el proyecto**

```bash
npm run start:dev
```

> La API estará disponible en: `http://localhost:3000/graphql`

---

## 📌 Esquema de la Base de Datos

### Entidades principales:

- **Usuario**  
  - `id`
  - `nombre`
  - `correo`
  - `contraseña`

- **Producto**  
  - `id`
  - `nombre`
  - `descripcion`
  - `precio`
  - `stock`

- **Pedido**  
  - `id`
  - `usuario` (relación ManyToOne)
  - `producto` (relación ManyToOne)
  - `cantidad`
  - `total`
  - `fecha_pedido`

---

## 🚀 Ejemplos de Uso

### Crear Usuario

```graphql
mutation {
  createUsuario(createUsuarioInput: {
    nombre: "María Test",
    correo: "maria@test.com",
    contraseña: "secreta123"
  }) {
    id
    nombre
  }
}
```

### Crear Producto

```graphql
mutation {
  createProducto(createProductoInput: {
    nombre: "Pan integral",
    descripcion: "Pan saludable",
    precio: 3.25,
    stock: 50
  }) {
    id
    nombre
  }
}
```

### Crear Pedido

```graphql
mutation {
  createPedido(createPedidoInput: {
    usuario_id: 1,
    producto_id: 1,
    cantidad: 2,
    total: 6.5,
    fecha_pedido: "2025-07-15T00:00:00.000Z"
  }) {
    id
    total
    fecha_pedido
  }
}
```

---

## 🧪 Testing rápido

Puedes usar [GraphQL Playground](http://localhost:3000/graphql) para probar directamente tus queries y mutaciones.

