import "reflect-metadata";
import { join } from "path";

import dotenv from "dotenv";
import findConfig from "find-config";
import { DataSource } from "typeorm";

const dotenvPath = findConfig(".env", { dir: __dirname });

if(dotenvPath) {
  dotenv.config({
    path: dotenvPath,
  });
} else if (process.env.ENV !== 'docker') {
  throw new Error("No .env file found");
}

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.ENV === 'docker' ? "db" : "localhost",
  port: 3306,
  username: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, "/entity/*.{js,ts}")],
  migrations: [],
  subscribers: [],
});
