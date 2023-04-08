import { Router } from "express";
const router = Router();

import recipesList from "./recipes";
import ingredientsList from "./ingredients";
import Users from "./users";

router.use("/recipes", recipesList);
router.use("/ingredients", ingredientsList);
router.use("/user", Users);

export default router;
