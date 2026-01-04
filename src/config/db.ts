import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const dbHost = process.env.DB_HOST ?? "localhost";
const dbPort = Number(process.env.DB_PORT ?? "5432");
const dbName = process.env.DB_NAME ?? "progressive_overload";
const dbUser = process.env.DB_USER ?? "app";
const dbPassword = process.env.DB_PASSWORD ?? "app";

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  logging: false,
});

export const assertDbConnection = async (): Promise<void> => {
  await sequelize.authenticate();
};
