import { NextFunction, Request, Response } from "express";
import { Recipe } from "../entity/recipe";
import { AppDataSource } from "../data-source";

export class RecipeController{
    static async create(req: Request, res: Response, next: NextFunction){
        try{
            const recipeRepository = AppDataSource.getRepository(Recipe);
            console.log(req.body);
            const recipe = new Recipe();
            recipe.name = req.body.name;
            recipe.description = req.body.description;
            recipe.photo = req.body.photo;
            recipe.healthy = req.body.healthy;
            recipe.type = req.body.time_to_make;
            
            if(await RecipeController.recipeExist(req.body.name)){
                res.status(409);
                res.send({ message: 'Recipe with provided name already exists!' });
            }

            await recipeRepository.save(recipe);
            res.status(201);
            res.send({});
        } catch (error){
            return next(error);
        }
    }
    private static async recipeExist(name: string){
        const repository = AppDataSource.getRepository(Recipe);
        const recipe = await repository.findOne({where: { name }});

        return !!recipe;
    }
}