export interface CreateProductoDto {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  restauranteId: string;
  imagen?: string;
}