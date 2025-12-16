import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';
import { Rol } from './rol.model.js';

export class Usuario extends Model {
  declare id: number;
  declare email: string;
  declare password_hash: string;
  declare rol_id: number;
}

Usuario.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(120), allowNull: false },
    email: { type: DataTypes.STRING(255), unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    rol_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: 'usuarios',
    paranoid: true, // soft delete
    underscored: true,
  }
);

Usuario.belongsTo(Rol, { foreignKey: 'rol_id' });