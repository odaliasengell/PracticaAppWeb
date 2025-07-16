
# 🧩 Proyecto: CRUD en Tiempo Real con NestJS + WebSocket

## 📚 Asignatura
- **Nombre**: Aplicación para el Servidor Web
- **Docente**: John Cevallos
- **Nivel**: Quinto
- **Paralelo**: B
- **Periodo**: 2025-2026 (1)
- **Práctica**: Nº3 – Arquitectura de Servicios

---

## 🎯 Objetivo

Implementar un CRUD en tiempo real utilizando WebSockets en NestJS para tres entidades personalizadas. Los datos son persistidos en SQLite con TypeORM, y los eventos se notifican a los clientes conectados mediante herramientas como **Postman**, **Insomnia** o clientes WebSocket compatibles con **Socket.IO**.

---

## 🏗️ Entidades Implementadas

1. **Producto**
   - `id`: número
   - `nombre`: texto
   - `precio`: decimal
   - `disponible`: booleano

2. **Repartidor**
   - `id`: número
   - `nombre`: texto
   - `correo`: email
   - `telefono`: texto
   - `activo`: booleano

3. **RutaEntrega**
   - `id`: número
   - `origen`: texto
   - `destino`: texto
   - `distanciaKm`: número decimal

---

## ⚙️ Instalación del Proyecto

```bash
# 1. Clona el repositorio
git clone https://github.com/odaliasengell/PracticaAppWeb

# 2. Entra al proyecto
cd SegundoParcial
cd practica3
cd realtime-crud

# 3. Instala dependencias
npm install

# 4. Ejecuta la aplicación
npm run start:dev
```

✅ Asegúrate de tener instalado:
- Node.js v18+
- NestJS CLI (`npm install -g @nestjs/cli`)
- SQLite3 (vía dependencia)

---

## 🌐 Uso con Cliente WebSocket

Puedes usar:

- ✅ [Postman 10+ con soporte WebSocket](https://www.postman.com/)
- ✅ [Insomnia 2023+](https://insomnia.rest/)
- ✅ [WebSocket King](https://chrome.google.com/webstore/detail/websocket-king-client/cbcbkhdmedgianpaifchdaddpnmgnknn)

### 🔌 URL de conexión

```
ws://localhost:3000/socket.io/?EIO=4&transport=websocket
```

---

## 🧪 Eventos WebSocket

### 📤 Eventos que puedes enviar

| Entidad      | Crear             | Actualizar          | Eliminar           | Obtener todos      |
|--------------|-------------------|----------------------|--------------------|---------------------|
| Producto     | `createProducto`  | `updateProducto`     | `deleteProducto`   | `getAllProductos`   |
| Repartidor   | `createRepartidor`| `updateRepartidor`   | `deleteRepartidor` | `getAllRepartidores`|
| RutaEntrega  | `createRutaEntrega`| `updateRutaEntrega` | `deleteRutaEntrega`| `getAllRutasEntrega`|

### 📥 Eventos que puedes escuchar

- `productos`
- `repartidores`
- `rutasEntrega`

---

## 🧾 Ejemplo JSON para enviar

### Crear producto:

```json
{
  "event": "createProducto",
  "data": {
    "nombre": "Leche",
    "precio": 1.25,
    "disponible": true
  }
}
```

### Escucha: `productos`

---

## 🧾 Archivos extra

- `postman_collection.json` ✅
- `README.md` ✅

---
