import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { RecipeIngredient } from "./recipe_ingredient";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 400,
    unique: true,
  })
  name: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: string;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.ingredient
  )
  ingredients: Ingredient[];
}
