// ========== VARIABLES ==========
const appName: string = "DeliveryApp";
const version: string = "1.0.0";
let totalOrders: number = 0;
let isAppActive: boolean = true;

// ========== INTERFACES ==========
interface Producto {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    disponible: boolean;
    descripcion?: string;
}

interface Restaurante {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    calificacion: number;
    activo: boolean;
    productos: Producto[];
}

interface Pedido {
    id: number;
    restauranteId: number;
    productos: Producto[];
    total: number;
    estado: 'pendiente' | 'preparando' | 'entregado' | 'cancelado';
    fechaPedido: Date;
}

// ========== OBJETOS LITERALES ==========
const producto1: Producto = {
    id: 1,
    nombre: "Pizza Margherita",
    precio: 12.50,
    categoria: "Pizza",
    disponible: true,
    descripcion: "Pizza clásica con tomate, mozzarella y albahaca"
};

const producto2: Producto = {
    id: 2,
    nombre: "Hamburguesa Clásica",
    precio: 8.99,
    categoria: "Hamburguesa",
    disponible: true,
    descripcion: "Hamburguesa con carne, lechuga, tomate y queso"
};

const producto3: Producto = {
    id: 3,
    nombre: "Pasta Carbonara",
    precio: 14.75,
    categoria: "Pasta",
    disponible: false,
    descripcion: "Pasta con salsa carbonara y panceta"
};

const restaurante1: Restaurante = {
    id: 1,
    nombre: "Bella Italia",
    direccion: "Av. Principal 123",
    telefono: "02-234-5678",
    calificacion: 4.5,
    activo: true,
    productos: [producto1, producto3]
};

const restaurante2: Restaurante = {
    id: 2,
    nombre: "Burger House",
    direccion: "Calle Secundaria 456",
    telefono: "02-345-6789",
    calificacion: 4.2,
    activo: true,
    productos: [producto2]
};

// ========== ARREGLOS Y ARREGLOS DE OBJETOS ==========
const productos: Producto[] = [producto1, producto2, producto3];
const restaurantes: Restaurante[] = [restaurante1, restaurante2];
const pedidos: Pedido[] = [];

// ========== FUNCIONES ==========
function crearProducto(id: number, nombre: string, precio: number, categoria: string): Producto {
    return {
        id,
        nombre,
        precio,
        categoria,
        disponible: true
    };
}

function mostrarProducto(producto: Producto): void {
    console.log(`=== PRODUCTO ===`);
    console.log(`ID: ${producto.id}`);
    console.log(`Nombre: ${producto.nombre}`);
    console.log(`Precio: $${producto.precio}`);
    console.log(`Categoría: ${producto.categoria}`);
    console.log(`Disponible: ${producto.disponible ? 'Sí' : 'No'}`);
    if (producto.descripcion) {
        console.log(`Descripción: ${producto.descripcion}`);
    }
    console.log('==================');
}

function crearRestaurante(id: number, nombre: string, direccion: string, telefono: string): Restaurante {
    return {
        id,
        nombre,
        direccion,
        telefono,
        calificacion: 0,
        activo: true,
        productos: []
    };
}

function mostrarRestaurante(restaurante: Restaurante): void {
    console.log(`=== RESTAURANTE ===`);
    console.log(`ID: ${restaurante.id}`);
    console.log(`Nombre: ${restaurante.nombre}`);
    console.log(`Dirección: ${restaurante.direccion}`);
    console.log(`Teléfono: ${restaurante.telefono}`);
    console.log(`Calificación: ${restaurante.calificacion}/5`);
    console.log(`Estado: ${restaurante.activo ? 'Activo' : 'Inactivo'}`);
    console.log(`Productos disponibles: ${restaurante.productos.length}`);
    console.log('===================');
}

// ========== OPERADORES SPREAD Y REST ==========
// Uso de Spread para combinar productos
const nuevosProductos: Producto[] = [
    ...productos,
    {
        id: 4,
        nombre: "Ensalada César",
        precio: 9.50,
        categoria: "Ensalada",
        disponible: true,
        descripcion: "Ensalada con pollo, crutones y aderezo césar"
    },
    {
        id: 5,
        nombre: "Tacos Mexicanos",
        precio: 11.25,
        categoria: "Mexicana",
        disponible: true,
        descripcion: "Tacos con carne, guacamole y pico de gallo"
    }
];

// Uso de Rest en función con parámetros dinámicos
function registrarProductos(...productosNuevos: Producto[]): void {
    console.log(`=== REGISTRANDO ${productosNuevos.length} PRODUCTOS ===`);
    productosNuevos.forEach(producto => {
        console.log(`✓ Registrado: ${producto.nombre} - $${producto.precio}`);
        productos.push(producto);
    });
    console.log('=======================================');
}

function agregarProductosARestaurante(restaurante: Restaurante, ...productosAAgregar: Producto[]): Restaurante {
    return {
        ...restaurante,
        productos: [...restaurante.productos, ...productosAAgregar]
    };
}

// ========== CALLBACKS ==========
function procesarProducto(producto: Producto, callback: (producto: Producto) => void): void {
    console.log(`Procesando producto: ${producto.nombre}...`);
    callback(producto);
}

function aplicarDescuento(producto: Producto): void {
    const descuento = 0.1; // 10% de descuento
    const precioConDescuento = producto.precio * (1 - descuento);
    console.log(`💰 Descuento aplicado a ${producto.nombre}`);
    console.log(`   Precio original: $${producto.precio}`);
    console.log(`   Precio con descuento: $${precioConDescuento.toFixed(2)}`);
}

function marcarComoFavorito(producto: Producto): void {
    console.log(`⭐ ${producto.nombre} ha sido marcado como favorito`);
}

// ========== PROMISES ==========
function procesarPedido(pedido: Pedido): Promise<string> {
    return new Promise((resolve, reject) => {
        console.log(`🔄 Procesando pedido #${pedido.id}...`);
        
        setTimeout(() => {
            // Simular que algunos pedidos pueden fallar
            if (Math.random() > 0.1) { // 90% de éxito
                totalOrders++;
                resolve(`✅ Pedido #${pedido.id} procesado exitosamente. Total: $${pedido.total}`);
            } else {
                reject(new Error(`❌ Error al procesar pedido #${pedido.id}`));
            }
        }, 2000); // Simular 2 segundos de procesamiento
    });
}

function buscarRestaurante(id: number): Promise<Restaurante> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const restaurante = restaurantes.find(r => r.id === id);
            if (restaurante) {
                resolve(restaurante);
            } else {
                reject(new Error(`Restaurante con ID ${id} no encontrado`));
            }
        }, 1000);
    });
}

// ========== ASYNC/AWAIT ==========
async function crearYProcesarPedido(restauranteId: number, productosIds: number[]): Promise<void> {
    try {
        console.log('🚀 Iniciando creación de pedido...');
        
        // Buscar restaurante
        const restaurante = await buscarRestaurante(restauranteId);
        console.log(`🏪 Restaurante encontrado: ${restaurante.nombre}`);
        
        // Filtrar productos disponibles
        const productosDelPedido = productos.filter(p => 
            productosIds.includes(p.id) && p.disponible
        );
        
        if (productosDelPedido.length === 0) {
            throw new Error('No hay productos disponibles para el pedido');
        }
        
        // Calcular total
        const total = productosDelPedido.reduce((sum, producto) => sum + producto.precio, 0);
        
        // Crear pedido
        const nuevoPedido: Pedido = {
            id: pedidos.length + 1,
            restauranteId,
            productos: productosDelPedido,
            total,
            estado: 'pendiente',
            fechaPedido: new Date()
        };
        
        pedidos.push(nuevoPedido);
        
        // Procesar pedido
        const mensaje = await procesarPedido(nuevoPedido);
        console.log(mensaje);
        
        // Actualizar estado
        nuevoPedido.estado = 'preparando';
        console.log(`📦 Pedido #${nuevoPedido.id} ahora está en preparación`);
        
    } catch (error) {
        console.error('💥 Error:', error instanceof Error ? error.message : 'Error desconocido');
    }
}

async function mostrarEstadisticas(): Promise<void> {
    try {
        console.log('\n📊 === ESTADÍSTICAS DEL SISTEMA ===');
        console.log(`Aplicación: ${appName} v${version}`);
        console.log(`Estado: ${isAppActive ? 'Activa' : 'Inactiva'}`);
        console.log(`Total de productos: ${productos.length}`);
        console.log(`Total de restaurantes: ${restaurantes.length}`);
        console.log(`Total de pedidos procesados: ${totalOrders}`);
        console.log(`Pedidos en sistema: ${pedidos.length}`);
        
        // Simular carga de datos adicionales
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('✅ Estadísticas cargadas correctamente');
        console.log('=====================================\n');
        
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
    }
}

// ========== FUNCIÓN PRINCIPAL ==========
async function main(): Promise<void> {
    console.log(`🎉 Bienvenido a ${appName}!\n`);
    
    // Mostrar algunos productos
    console.log('=== PRODUCTOS DISPONIBLES ===');
    productos.forEach(mostrarProducto);
    
    // Mostrar restaurantes
    console.log('=== RESTAURANTES ===');
    restaurantes.forEach(mostrarRestaurante);
    
    // Usar spread y rest
    console.log('=== AGREGANDO NUEVOS PRODUCTOS ===');
    const producto6 = crearProducto(6, "Sushi Roll", 16.99, "Japonesa");
    const producto7 = crearProducto(7, "Paella Valenciana", 18.50, "Española");
    registrarProductos(producto6, producto7);
    
    // Usar callbacks
    console.log('\n=== APLICANDO DESCUENTOS ===');
    procesarProducto(producto1, aplicarDescuento);
    procesarProducto(producto2, marcarComoFavorito);
    
    // Crear y procesar pedidos con async/await
    console.log('\n=== PROCESANDO PEDIDOS ===');
    await crearYProcesarPedido(1, [1, 3]); // Pizza y Pasta del restaurante 1
    await crearYProcesarPedido(2, [2]); // Hamburguesa del restaurante 2
    
    // Mostrar estadísticas finales
    await mostrarEstadisticas();
    
    console.log('🏁 Ejecución completada exitosamente!');
}

// Ejecutar la aplicación
main().catch(error => {
    console.error('💥 Error en la aplicación:', error);
});