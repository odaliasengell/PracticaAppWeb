import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductoModule } from './producto/producto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PedidoModule } from './pedido/pedido.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';  // Agregar el import del driver Apollo

@Module({
  imports: [
    // Configuración de GraphQL con ApolloDriver
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,  // Especificar que se usará Apollo como driver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Generación automática del esquema
      playground: true,  // Para probar GraphQL en el navegador
    }),

    // Configuración de TypeORM para SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite',  // Usamos SQLite
      database: 'data.db',  // El archivo SQLite que almacenará la base de datos
      entities: [join(__dirname, '**/*.entity{.ts,.js}')], // Usamos 'join' para garantizar que las rutas se resuelvan correctamente
      synchronize: true,  // Para crear las tablas automáticamente (solo en desarrollo)
    }),

    ProductoModule,  // Importación del módulo Producto
    UsuarioModule,   // Importación del módulo Usuario
    PedidoModule,    // Importación del módulo Pedido
  ],
})
export class AppModule {}
