import { Router } from 'express';
import { ingredientController } from '../controllers/ingredient.controller';

const IngredientRouter = Router();

IngredientRouter.get('/', ingredientController.showAll);
IngredientRouter.post('/', ingredientController.create);

export default IngredientRouter;