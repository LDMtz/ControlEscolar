import { Sequelize } from "sequelize";

export interface DBConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  env: string;
}

export const getSequelizeInstance = ({
  host,
  port,
  database,
  user,
  password,
  env,
}: DBConfig) => {
  return new Sequelize(database, user, password, {
    host,
    port,
    dialect: "postgres",
    logging: env === 'development' ? true : false,
  });
};