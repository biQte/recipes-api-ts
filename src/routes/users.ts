import { Router } from "express";
import { userController } from "./../controllers/user.controller";

const usersRouter = Router();

usersRouter.post("/register", userController.create);
usersRouter.post("/login", userController.login);

export default usersRouter;
