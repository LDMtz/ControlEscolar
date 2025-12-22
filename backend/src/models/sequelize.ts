import { Sequelize } from 'sequelize';
import type { Dialect } from 'sequelize';

import { createRequire } from 'module';

// Crear require para importar el archivo CommonJS
const require = createRequire(import.meta.url);
const config = require('../config/database.cjs') as Config;

type ConfigKeys = 'development' | 'test' | 'production';

const env = (process.env.NODE_ENV || 'development') as ConfigKeys;
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: env === 'development' ? console.log : false,
});

//Tipos
interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

interface Config {
  development: DatabaseConfig;
  test: DatabaseConfig;
  production: DatabaseConfig;
}

export default sequelize;
