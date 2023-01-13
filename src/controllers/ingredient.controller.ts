import { NextFunction, Request, Response } from "express";
import { Ingredient } from "../entity/ingredient";
import { AppDataSource } from "../data-source";

export class ingredientController{
    static async create(req: Request, res: Response, next: NextFunction){
        try{
            const ingredientRepository = AppDataSource.getRepository(Ingredient);
            console.log(req.body);
            const ingredient = new Ingredient();
            ingredient.name = req.body.name;
            
            if(await ingredientController.ingredientExist(req.body.name)){
                console.log('exists');
                res.status(409);
                res.send({ message: 'Such ingredient already exists!' });
            }

            await ingredientRepository.save(ingredient);
            res.status(201);
            res.send({});
        } catch (error){
            return next(error);
        }
    }

    private static async ingredientExist(name: string){
        const repository = AppDataSource.getRepository(Ingredient);
        const ingredient = await repository.findOne({where: { name }});

        return !!ingredient;
    }

    static async showAll(req: Request, res: Response){
        const IngredientRepository = AppDataSource.getRepository(Ingredient);
        const ingredients = await IngredientRepository.find();
        res.json(ingredients);
    }

}