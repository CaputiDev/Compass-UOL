import { Router } from 'express';
import UserController from './controllers/UserController.js';
import InstitutionController from './controllers/InstituitionController.js';

const routes = Router();
routes.get('/', (req,res)=>{
    res.send({message: 'olá mundo'});
});
routes.post('/usuarios', UserController.create);

routes.post('/instituicoes',InstitutionController.create);

export default routes;
