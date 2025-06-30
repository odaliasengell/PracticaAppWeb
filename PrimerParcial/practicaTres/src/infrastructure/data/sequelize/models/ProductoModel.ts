import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../database/sequelize-config';

export class ProductoModel extends Model {
  public id!: string;
  public nombre!: string;
  public descripcion!: string;
  public precio!: number;
  public categoria!: string;
  public restauranteId!: string;
  public imagen?: string;
  public activo!: boolean;
  public fechaCreacion!: Date;
  public fechaActualizacion!: Date;
}

ProductoModel.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  restauranteId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'restaurante_id'
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  tableName: 'productos',
  timestamps: true,
  createdAt: 'fechaCreacion',
  updatedAt: 'fechaActualizacion'
});