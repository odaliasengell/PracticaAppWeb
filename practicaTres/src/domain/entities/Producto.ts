export class Producto {
  constructor(
    public id: string,
    public nombre: string,
    public descripcion: string,
    public precio: number,
    public categoria: string,
    public restauranteId: string,
    public imagen?: string,
    public activo: boolean = true,
    public fechaCreacion: Date = new Date(),
    public fechaActualizacion?: Date
  ) {
    this.validarDatos();
  }

  private validarDatos(): void {
    if (!this.nombre || this.nombre.trim().length === 0) {
      throw new Error('El nombre del producto es requerido');
    }
    if (this.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    if (!this.categoria || this.categoria.trim().length === 0) {
      throw new Error('La categoría es requerida');
    }
  }

  public actualizar(datos: Partial<Producto>): void {
    Object.assign(this, datos);
    this.fechaActualizacion = new Date();
    this.validarDatos();
  }

  public desactivar(): void {
    this.activo = false;
    this.fechaActualizacion = new Date();
  }

  public activar(): void {
    this.activo = true;
    this.fechaActualizacion = new Date();
  }
}