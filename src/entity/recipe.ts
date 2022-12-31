import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RecipeIngridient } from './recipe_ingredient';

@Entity()
export class Recipe{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 400,
        unique: true,
    })
    name: string;

    @Column({
        type: 'text',
    })
    description: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    photo: string;

    @Column({type: 'boolean'})
    healthy: string;

    @Column({
        type: 'varchar',
         length: 100,
    })
    type: string;

    @Column()
    time_to_make: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(() => RecipeIngridient, (recipeIngridient) => recipeIngridient.recipe)
    recipes: Recipe[];
}