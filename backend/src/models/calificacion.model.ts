import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';
import { Usuario } from './usuario.model.js';
import { Alumno } from './alumno.model.js';
import { Materia } from './materia.model.js';

export class Calificacion extends Model {
    declare id: number;
    declare alumno_id: number;
    declare materia_id: number;
    declare maestro_id: number;
    declare nota: number;
    declare fecha_registro: Date;
    declare observaciones?: string;
    declare created_at: Date;
    declare updated_at: Date;
    declare deleted_at?: Date;
}

Calificacion.init(
    {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            allowNull: false,
            autoIncrement: true 
        },
        alumno_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        materia_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        maestro_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        nota: { 
            type: DataTypes.DECIMAL(5, 2), 
            allowNull: false 
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false
        },
        observaciones: { 
            type: DataTypes.TEXT 
        },
    },
    {
        sequelize,
        tableName: 'calificaciones',
        paranoid: true,
        underscored: true,
    }
);

// Relaciones
Calificacion.belongsTo(Alumno, { foreignKey: 'alumno_id' });
Calificacion.belongsTo(Materia, { foreignKey: 'materia_id' });
Calificacion.belongsTo(Usuario, { foreignKey: 'maestro_id', as: 'maestro' });
