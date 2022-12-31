import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RecipeIngridient } from './recipe_ingredient';

@Entity()
export class Ingredient{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 400,
        unique: true,
    })
    name: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(() => RecipeIngridient, (recipeIngridient) => recipeIngridient.ingridient)
    ingridients: Ingredient[]
}