import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';

@Entity()
export class RecipeIngredient{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.recipes)
    recipe: Recipe;

    @ManyToOne(() => Ingredient, (ingredient) => ingredient.ingredients)
    ingredient: Ingredient;

    @Column({
        type: 'varchar',
        length: 255,
    })
    quantity: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}