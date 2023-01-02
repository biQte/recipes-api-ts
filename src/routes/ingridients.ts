import { Router } from 'express';
import { ingridientController } from '../controllers/ingridient.controller';

const IngridientRouter = Router();

IngridientRouter.get('/', ingridientController.showAll);
IngridientRouter.post('/', ingridientController.create);

export default IngridientRouter;