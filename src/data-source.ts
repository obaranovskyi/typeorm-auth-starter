import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "./entities/User"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "root",
  password: "root",
  database: "my-db-name",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
})
