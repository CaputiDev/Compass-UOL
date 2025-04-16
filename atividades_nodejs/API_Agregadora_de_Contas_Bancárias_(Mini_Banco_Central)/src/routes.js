import { Router } from 'express';
import UserController from './controllers/UserController.js';
import InstitutionController from './controllers/InstituitionController.js';
import ContaController from './controllers/ContaController.js';

const routes = Router();
routes.get('/', (req,res)=>{
    res.send({message: 'olá mundo'});
});

routes.get('/usuarios', UserController.index)
routes.get('/usuarios/:id/', UserController.index);
routes.post('/usuarios', UserController.create);
routes.get('/usuarios/:id/saldo', UserController.obterSaldoTotal);

routes.post('/instituicoes',InstitutionController.create);

routes.post('/usuarios/contas',ContaController.create);
export default routes;
