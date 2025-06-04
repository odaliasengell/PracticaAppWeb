import { Request, Response } from 'express';
import { ProductoService } from '../../application/services/ProductoService';

export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  async crear(req: Request, res: Response): Promise<void> {
    try {
      const producto = await this.productoService.crearProducto(req.body);
      res.status(201).json({
        success: true,
        data: producto,
        message: 'Producto creado exitosamente'
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async obtener(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const producto = await this.productoService.obtenerProducto(id);
      
      if (!producto) {
        res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
        return;
      }

      res.json({
        success: true,
        data: producto
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const productos = await this.productoService.listarProductos();
      res.json({
        success: true,
        data: productos
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const producto = await this.productoService.actualizarProducto(id, req.body);
      res.json({
        success: true,
        data: producto,
        message: 'Producto actualizado exitosamente'
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}