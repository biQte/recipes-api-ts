import { DataSource } from 'typeorm';
import 'dotenv/config';
import { Ingredient } from './entity/ingredient';
import { Recipe } from './entity/recipe';
import { RecipeIngridient } from './entity/recipe_ingredient';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Ingredient, Recipe, RecipeIngridient],
    migrations: [],
    subscribers: [],
});