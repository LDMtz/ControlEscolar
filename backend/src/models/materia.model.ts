import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

export class Materia extends Model {
  declare id: number;
  declare codigo?: string;
  declare nombre: string;
  declare descripcion?: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date;
}

Materia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'materias',
    paranoid: true, // soft delete
    underscored: true,
  },
);
