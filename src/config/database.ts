import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import "reflect-metadata";
import User from "../models/User";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  models: [User],
  logging: false
});

export default sequelize;
