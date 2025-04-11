import { Router } from 'express';
import UserController from './controllers/UserController.js';

const routes = Router();

routes.get('/usuarios/:id/contas', UserController.create);

export default routes;
