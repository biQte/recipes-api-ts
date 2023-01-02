import { NextFunction, Request, Response } from "express";
import { Ingredient } from "../entity/ingredient";
import { AppDataSource } from "../data-source";
import { ValidationError } from './../errors/custom';

export class ingridientController{
    static async create(req: Request, res: Response, next: NextFunction){
        try{
            const ingridientRepository = AppDataSource.getRepository(Ingredient);
            console.log(req.body);
            const ingredient = new Ingredient();
            ingredient.name = req.body.name;
            
            if(await ingridientController.ingridientExist(req.body.name)){
                console.log('exists');
                throw new ValidationError([], 'Such ingredient already exists.', 409);
            }

            const ingredientResult = await ingridientRepository.save(ingredient);
            res.status(201);
            res.send({});
        } catch (error){
            return next(error);
        }
    }

    private static async ingridientExist(name: string){
        const repository = AppDataSource.getRepository(Ingredient);
        const ingridient = await repository.findOne({where: { name }});

        return !!ingridient;
    }

    static async showAll(req: Request, res: Response){
        const IngredientRepository = AppDataSource.getRepository(Ingredient);
        const ingridients = await IngredientRepository.find();
        res.json(ingridients);
    }
}