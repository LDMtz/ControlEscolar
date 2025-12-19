import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

export class Rol extends Model {
  declare id: number;
  declare nombre: string;
  declare descripcion?: string;
}

Rol.init(
  {
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false, 
      primaryKey: true,
    },
    nombre: { 
      type: DataTypes.STRING(30), 
      allowNull: false,
      unique: true
    },
    descripcion: { 
      type: DataTypes.STRING(255),
      allowNull: true
    },
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: false,
  }
);