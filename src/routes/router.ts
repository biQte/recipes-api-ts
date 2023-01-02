import express from 'express';
const router = express.Router();

import recipesList from './recipes';
import ingridientsList from './ingridients';

router.use('/recipes', recipesList);
router.use('/ingridients', ingridientsList);

export default router;