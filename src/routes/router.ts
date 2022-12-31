import express from 'express';
const router = express.Router();

import recipesList from './recipes';

router.use('/recipes', recipesList);

export default router;