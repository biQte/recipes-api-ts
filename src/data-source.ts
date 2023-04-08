import { DataSource } from "typeorm";
import "dotenv/config";
import { Ingredient } from "./entity/ingredient";
import { Recipe } from "./entity/recipe";
import { RecipeIngredient } from "./entity/recipe_ingredient";
import { User } from "./entity/user";
import { Password } from "./entity/password";
import { Session } from "./entity/session";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Ingredient, Recipe, RecipeIngredient, User, Password, Session],
  migrations: [],
  subscribers: [],
});
