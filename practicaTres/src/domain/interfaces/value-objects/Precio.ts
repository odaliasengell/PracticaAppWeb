export class Precio {
  constructor(private readonly valor: number) {
    if (valor <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
  }

  public getValue(): number {
    return this.valor;
  }

  public aplicarDescuento(porcentaje: number): Precio {
    if (porcentaje < 0 || porcentaje > 100) {
      throw new Error('El descuento debe estar entre 0 y 100%');
    }
    const descuento = this.valor * (porcentaje / 100);
    return new Precio(this.valor - descuento);
  }

  public toString(): string {
    return `$${this.valor.toFixed(2)}`;
  }
}