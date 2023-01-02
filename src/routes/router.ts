import express from 'express';
const router = express.Router();

import recipesList from './recipes';
import ingredientsList from './ingredients';

router.use('/recipes', recipesList);
router.use('/ingredients', ingredientsList);

export default router;