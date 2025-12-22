import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';
import { Rol } from './rol.model.js';

export class Usuario extends Model {
  declare id: number;
  declare email: string;
  declare password_hash: string;
  declare rol_id: number;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'usuarios',
    paranoid: true, // soft delete
    underscored: true,
  },
);

Usuario.belongsTo(Rol, { foreignKey: 'rol_id' });
