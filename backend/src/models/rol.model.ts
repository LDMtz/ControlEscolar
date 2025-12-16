import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

export class Rol extends Model {
  declare id: number;
  declare nombre: string;
  declare descripcion?: string;
}

Rol.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(30), allowNull: false },
    descripcion: { type: DataTypes.STRING(255) },
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: false,
  }
);