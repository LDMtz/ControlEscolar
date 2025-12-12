import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const PORT = Number(process.env.DB_PORT) || 5432;
const DB_NAME = process.env.DB_NAME || 'postgres';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: PORT,
    dialect: "postgres",
    logging: NODE_ENV === 'development' ? true : false,
  });

export default db;