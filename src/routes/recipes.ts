import { Router } from 'express';


const RecipesRouter = Router();

RecipesRouter.get('/', (req, res) => {
    res.json({recipes: {
        firstRecipe: 'first'
    }});
});

export default RecipesRouter;