import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

export class Alumno extends Model {
    declare id: number;
    declare nombre: string;
    declare matricula?: string;
    declare fecha_nacimiento?: Date;
    declare grupo?: string;
    declare created_at: Date;
    declare updated_at: Date;
    declare deleted_at?: Date;
}

Alumno.init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombre: { 
        type: DataTypes.STRING(150), 
        allowNull: false 
    },
    matricula: { 
        type: DataTypes.STRING(50), 
        allowNull: true,
        unique: true 
    },
    fecha_nacimiento: { 
        type: DataTypes.DATEONLY,
        allowNull: true 
    },
    grupo: { 
        type: DataTypes.STRING(50),
        allowNull: true
    },
  },
  {
    sequelize,
    tableName: 'alumnos',
    paranoid: true, // soft delete
    underscored: true,
  }
);